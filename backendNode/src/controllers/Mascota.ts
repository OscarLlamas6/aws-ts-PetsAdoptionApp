import { Mascota } from '../models/Mascota'
import { sequelize } from '../sequalize'
import AwsService from '../services/awsService'
import { Op } from 'sequelize';

export default class MascotaController {

    static instance = new MascotaController()

    async getMascotaDescriptionAudio(req: any, res: any) {
        let transaction = await sequelize.transaction()

        try {
            let {
                MascotaId
            } = req.query

            let mascota: Mascota | null = await Mascota.findOne({
                where: {
                    id: MascotaId
                },
                transaction: transaction
            })

            let audio;
            if (mascota && mascota.descripcion) {
                audio = await AwsService.instance.getAudioFromText(mascota.descripcion)
            }

            await transaction.commit()
            return res.status(201).send({ error: false, message: '', audio: audio });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    async traducirMascotaDescription(req: any, res: any) {
        let transaction = await sequelize.transaction()

        try {
            let {
                MascotaId,
                Idioma
            } = req.query

            let mascota: Mascota | null = await Mascota.findOne({
                where: {
                    id: MascotaId
                },
                transaction: transaction
            })

            let traduccion;
            if (mascota && mascota.descripcion) {
                traduccion = await AwsService.instance.translate(Idioma, mascota.descripcion)
            }

            await transaction.commit()
            return res.status(201).send({ error: false, message: '', traduccion: traduccion });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    async getMascotaTags(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                MascotaId
            } = req.query

            let mascota: Mascota | null = await Mascota.findOne({
                where: {
                    id: MascotaId
                },
                transaction: transaction
            })

            let tags;
            if (mascota && mascota.linkFotoPerfil) {
                //se hace un split de la ruta de la foto de perfil
                let linkFotoPerfil: string[] = mascota.linkFotoPerfil.split('/')

                if (linkFotoPerfil.length == 0) throw new Error("No se pudo extraer tags de la imagen");

                //aqui se hace el path con el cual rekognition ira a buscar la imagen al bucket -> fotosPerfil/imagen.jpg
                let pathFotoPerfil = `${linkFotoPerfil[linkFotoPerfil.length - 2]}/${linkFotoPerfil[linkFotoPerfil.length - 1]}`

                //metodo para comparar imagenes, recibe como parametros el path de la foto de perfil y aparte la foto en bytes de la foto que se toma en el momento de hacer login
                tags = await AwsService.instance.getTagsImagen(pathFotoPerfil, false)
            }

            await transaction.commit()
            return res.status(201).send({ error: false, message: '', result: mascota, tags: tags });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    async getMascotasEnAdopcion(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let params = req.params

            let mascotas: Mascota[] | null = await Mascota.findAll({
                where: {
                    estado: {
                        [Op.ne]: 'adoptado'
                    }
                },
                transaction: transaction
            })

            await transaction.commit()
            return res.status(201).send({ error: false, message: '', result: mascotas });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    async createMascota(req: any, res: any) {
        let transaction = await sequelize.transaction()
        try {
            let {
                nombre,
                raza,
                tipo,
                sexo,
                Base64FotoPerfil,
                descripcion
            } = req.body

            let linkFotoS3;
            if (Base64FotoPerfil) linkFotoS3 = await AwsService.instance.uploadFoto(Base64FotoPerfil, true)

            const mascota: Mascota = await Mascota.create({
                nombre: nombre,
                raza: raza,
                tipo: tipo,
                sexo: sexo,
                estado: 'en adopcion',
                linkFotoPerfil: linkFotoS3 && linkFotoS3.Location ? linkFotoS3.Location : '',
                descripcion: descripcion
            },
                { transaction: transaction }
            )

            await transaction.commit()
            return res.status(201).send({ error: false, mensaje: 'Registro de mascota exitoso', result: true });
        } catch (error: any) {
            await transaction.rollback()
            return res.status(500).send({ error: true, message: error.message });
        }
    }

    // async createFoto(req: any, res: any) {
    //     let transaction = await sequelize.transaction()
    //     try {
    //         let data = req.body

    //         const fotoEcontrada: Foto | null = await Foto.findOne({
    //             where: {
    //                 nombre: data.nombre,
    //                 IdAlbum: data.idAlbum,
    //             },
    //             transaction: transaction
    //         })

    //         if (fotoEcontrada) throw new Error('Ya existe una foto con este nombre en este album');

    //         let linkFotoS3 = await AwsService.instance.uploadFoto(data.linkFoto, false)

    //         const foto: Foto = await Foto.create({
    //             nombre: data.nombre,
    //             IdAlbum: data.idAlbum,
    //             link: linkFotoS3.Location ? linkFotoS3.Location : ''
    //         },
    //             { transaction: transaction }
    //         )
    //         await transaction.commit()
    //         return res.status(201).send({ error: false, message: 'Se subió foto correctamente', result: foto });
    //     } catch (error: any) {
    //         await transaction.rollback()
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }

    // async getTextImagen(req: any, res: any) {
    //     try {
    //         let data = req.body

    //         let text = await AwsService.instance.getTextImagen(data.imagenBase64)

    //         return res.status(201).send({ error: false, message: 'Se extrajo el texto exitosamente', result: text });
    //     } catch (error: any) {
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }

    // async translateDescripcionImagen(req: any, res: any) {
    //     try {
    //         let data = req.body

    //         let tranduccion = await AwsService.instance.translate(data.idioma, data.texto)

    //         return res.status(201).send({ error: false, message: 'Se tradujo el texto exitosamente', result: tranduccion });
    //     } catch (error: any) {
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }

    // async createFotoAnimal(req: any, res: any) {
    //     let transaction = await sequelize.transaction()
    //     try {
    //         let data = req.body

    //         let linkFotoS3 = await AwsService.instance.uploadFoto(data.imagenBase64, false)

    //         const foto: Foto = await Foto.create({
    //             nombre: data.nombre,
    //             link: linkFotoS3.Location ? linkFotoS3.Location : '',
    //             descripcion: data.descripcion
    //         },
    //             { transaction: transaction }
    //         )

    //         let tags = await AwsService.instance.getTagsImagen(data.imagenBase64, true)

    //         if (!tags || !tags.Labels) throw new Error("No se encontraron tags");


    //         for (const element of tags.Labels) {

    //             const albumEncontrado: Album | null = await Album.findOne({
    //                 where: {
    //                     nombre: element.Name,
    //                     IdUsuario: data.idUsuario,
    //                 },
    //                 transaction: transaction
    //             })

    //             if (albumEncontrado) {
    //                 await DetalleFoto.create({
    //                     IdAlbum: albumEncontrado.id,
    //                     IdFoto: foto.id
    //                 },
    //                     { transaction: transaction }
    //                 )
    //             } else {
    //                 const albumNuevo: Album = await Album.create({
    //                     nombre: element.Name ? element.Name : '',
    //                     IdUsuario: data.idUsuario
    //                 },
    //                     { transaction: transaction }
    //                 )

    //                 await DetalleFoto.create({
    //                     IdAlbum: albumNuevo.id,
    //                     IdFoto: foto.id
    //                 },
    //                     { transaction: transaction }
    //                 )
    //             }
    //         }

    //         // const albumEncontrado: number = await Album.count({
    //         //     where: {
    //         //         nombre: element.Name,
    //         //         IdUsuario: data.idUsuario,
    //         //     },
    //         //     transaction: transaction
    //         // })

    //         // if (albumEncontrado) {
    //         // await DetalleFoto.create({
    //         //     IdAlbum: albumEncontrado.id,
    //         //     IdFoto: foto.id
    //         // },
    //         //     { transaction: transaction }
    //         // )
    //         // } else {
    //         //     const albumNuevo: Album = await Album.create({
    //         //         nombre: element.Name ? element.Name : '',
    //         //         IdUsuario: data.idUsuario
    //         //     },
    //         //         { transaction: transaction }
    //         //     )

    //         //     // await DetalleFoto.create({
    //         //     //     IdAlbum: albumNuevo.id,
    //         //     //     IdFoto: foto.id
    //         //     // },
    //         //     //     { transaction: transaction }
    //         //     // )
    //         // }


    //         await transaction.commit()
    //         return res.status(201).send({ error: false, message: 'Se subió foto correctamente', result: tags });
    //     } catch (error: any) {
    //         await transaction.rollback()
    //         return res.status(500).send({ error: true, message: error.message });
    //     }
    // }

}