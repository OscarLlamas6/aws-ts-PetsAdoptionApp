import { sequelize } from '../sequalize'
import { Op } from 'sequelize';
import { Adopcion } from '../models/Adopcion';
import { Mascota } from '../models/Mascota';
import { Usuario } from '../models/Usuario';

export default class AlbumController {

    static instance = new AlbumController()

    //Este endpoint trae los adopciones y usuarios que se postularon a adoptar a la mascota
    async getAdopcionByUsuarioId(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                IdUsuario
            } = req.query

            let adopciones: Adopcion[] = await Adopcion.findAll({
                where: {
                    IdUsuario: IdUsuario
                },
                include: [
                    {
                        model: Mascota
                    }
                ],
                transaction: transaction
            })

            await transaction.commit()
            return res.status(201).send({ error: false, message: '', result: adopciones });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    //Este endpoint trae los adopciones y usuarios que se postularon a adoptar a la mascota
    async getAdopcionByMascotaId(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                IdMascota
            } = req.query

            let adopciones: Adopcion[] = await Adopcion.findAll({
                where: {
                    IdMascota: IdMascota
                },
                include: [
                    {
                        model: Usuario,
                        attributes: ['userName', 'nombre', 'linkFotoPerfil']
                    }
                ],
                transaction: transaction
            })

            await transaction.commit()
            return res.status(201).send({ error: false, message: '', result: adopciones });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

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
            return res.status(201).send({ error: false, message: '', result: true });
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

            let mascotaFounded: Mascota | null = await Mascota.findOne({
                where: {
                    id: IdMascota
                },
                transaction: transaction
            })

            if (!mascotaFounded) throw new Error("No se encontro la mascota");
            if (mascotaFounded.estado && mascotaFounded.estado == 'adoptado') throw new Error("Esta mascota ya se adopto");


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
            return res.status(201).send({ error: false, message: 'Se actualizo adopción y estado de la mascota', result: true });
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