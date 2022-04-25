"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mascota_1 = require("../models/Mascota");
const sequalize_1 = require("../sequalize");
const awsService_1 = __importDefault(require("../services/awsService"));
const sequelize_1 = require("sequelize");
class MascotaController {
    getMascotaDescriptionAudio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { MascotaId } = req.query;
                let mascota = yield Mascota_1.Mascota.findOne({
                    where: {
                        id: MascotaId
                    },
                    transaction: transaction
                });
                let audio;
                if (mascota && mascota.descripcion) {
                    audio = yield awsService_1.default.instance.getAudioFromText(mascota.descripcion);
                }
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', audio: audio });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    traducirMascotaDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { MascotaId, Idioma } = req.query;
                let mascota = yield Mascota_1.Mascota.findOne({
                    where: {
                        id: MascotaId
                    },
                    transaction: transaction
                });
                let traduccion;
                if (mascota && mascota.descripcion) {
                    traduccion = yield awsService_1.default.instance.translate(Idioma, mascota.descripcion);
                }
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', traduccion: traduccion });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    getMascotaTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { MascotaId } = req.query;
                let mascota = yield Mascota_1.Mascota.findOne({
                    where: {
                        id: MascotaId
                    },
                    transaction: transaction
                });
                let tags;
                if (mascota && mascota.linkFotoPerfil) {
                    //se hace un split de la ruta de la foto de perfil
                    let linkFotoPerfil = mascota.linkFotoPerfil.split('/');
                    if (linkFotoPerfil.length == 0)
                        throw new Error("No se pudo extraer tags de la imagen");
                    //aqui se hace el path con el cual rekognition ira a buscar la imagen al bucket -> fotosPerfil/imagen.jpg
                    let pathFotoPerfil = `${linkFotoPerfil[linkFotoPerfil.length - 2]}/${linkFotoPerfil[linkFotoPerfil.length - 1]}`;
                    //metodo para comparar imagenes, recibe como parametros el path de la foto de perfil y aparte la foto en bytes de la foto que se toma en el momento de hacer login
                    tags = yield awsService_1.default.instance.getTagsImagen(pathFotoPerfil, false);
                }
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', result: mascota, tags: tags });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    getMascotasEnAdopcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let params = req.params;
                let mascotas = yield Mascota_1.Mascota.findAll({
                    where: {
                        estado: {
                            [sequelize_1.Op.ne]: 'adoptado'
                        }
                    },
                    transaction: transaction
                });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', result: mascotas });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    createMascota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { nombre, raza, tipo, sexo, Base64FotoPerfil, descripcion } = req.body;
                let linkFotoS3;
                if (Base64FotoPerfil)
                    linkFotoS3 = yield awsService_1.default.instance.uploadFoto(Base64FotoPerfil, true);
                const mascota = yield Mascota_1.Mascota.create({
                    nombre: nombre,
                    raza: raza,
                    tipo: tipo,
                    sexo: sexo,
                    estado: 'en adopcion',
                    linkFotoPerfil: linkFotoS3 && linkFotoS3.Location ? linkFotoS3.Location : '',
                    descripcion: descripcion
                }, { transaction: transaction });
                yield transaction.commit();
                return res.status(201).send({ error: false, mensaje: 'Registro de mascota exitoso', result: true });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
}
exports.default = MascotaController;
MascotaController.instance = new MascotaController();
