import { sequelize } from '../sequalize'
import { Op } from 'sequelize';
import { Adopcion } from '../models/Adopcion';
import { Mascota } from '../models/Mascota';

export default class AlbumController {

    static instance = new AlbumController()

    //Este endpoint sirve para bajar la bandera de notificacion de que el usuario fue elegido para adoptar a la mascota
    async notificacionVistaUsuario(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                idAdopcion
            } = req.body

            await Adopcion.update({
                notificado: true
            },
                {
                    where: {
                        id: idAdopcion
                    },
                    transaction: transaction
                }
            )

            await transaction.commit()
            return res.status(201).send({ error: false, message: 'Se actualizo adopción y estado de las mascota', result: true });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    //Este endpoint sirve para que el admin le asigne a un usuario la adopcion
    async aprobarAdopcionAUsuario(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                IdUsuario,
                IdMascota
            } = req.body

            await Adopcion.update({
                elegido: true
            },
                {
                    where: {
                        IdUsuario: IdUsuario,
                        IdMascota: IdMascota,
                    },
                    transaction: transaction
                }
            )

            await Mascota.update({
                estado: 'adoptado'
            },
                {
                    where: {
                        id: IdMascota
                    },
                    transaction: transaction
                }
            )

            await transaction.commit()
            return res.status(201).send({ error: false, message: 'Se actualizo adopción y estado de las mascota', result: true });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    async createAdopcion(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                IdUsuario,
                IdMascota
            } = req.body

            let adopcionFounded: Adopcion | null = await Adopcion.findOne({
                where: {
                    IdUsuario: IdUsuario,
                    IdMascota: IdMascota,
                },
                transaction: transaction
            })

            if (adopcionFounded) throw new Error("No puede mandar dos solicitudes para la misma mascota");

            const adopcion: Adopcion = await Adopcion.create({
                IdUsuario: IdUsuario,
                IdMascota: IdMascota,
                notificado: false,
                elegido: false
            },
                { transaction: transaction }
            )
            await transaction.commit()
            return res.status(201).send({ error: false, message: 'Se creo adopción correctamente', result: adopcion });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    // async deleteAlbum(req: any, res: any) {
    //     let transaction = await sequelize.transaction()
    //     try {
    //         let params = req.params

    //         await Album.destroy({
    //             where: {
    //                 id: params.idAlbum,
    //             },
    //             transaction: transaction
    //         })

    //         await transaction.commit()
    //         return res.status(201).send({ error: false, message: 'Se album se borro correctamente', result: true });
    //     } catch (error: any) {
    //         await transaction.rollback()
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }

    // async getAlbum(req: any, res: any) {
    //     let transaction = await sequelize.transaction()
    //     try {
    //         let params = req.params

    //         let album: Album | null = await Album.findOne({
    //             where: {
    //                 id: params.idAlbum,
    //             },
    //             transaction: transaction
    //         })

    //         if (!album) throw new Error('No se encontró el album');

    //         await transaction.commit()
    //         return res.status(201).send({ error: false, message: 'Se encontró el album', result: album });
    //     } catch (error: any) {
    //         await transaction.rollback()
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }

    // async getAlbums(req: any, res: any) {
    //     let transaction = await sequelize.transaction()
    //     try {
    //         let params = req.params

    //         let albums: Album[] | null = await Album.findAll({
    //             where: {
    //                 IdUsuario: params.idUsuario,
    //             },
    //             include: [
    //                 {
    //                     model: DetalleFoto,
    //                     include: [
    //                         { model: Foto }
    //                     ]
    //                 }
    //             ],
    //             transaction: transaction
    //         })

    //         await transaction.commit()
    //         return res.status(201).send({ error: false, message: 'Se encontró el album', result: albums });
    //     } catch (error: any) {
    //         await transaction.rollback()
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }
}