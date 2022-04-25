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
Object.defineProperty(exports, "__esModule", { value: true });
const sequalize_1 = require("../sequalize");
const Adopcion_1 = require("../models/Adopcion");
const Mascota_1 = require("../models/Mascota");
const Usuario_1 = require("../models/Usuario");
class AlbumController {
    //Este endpoint trae los adopciones y usuarios que se postularon a adoptar a la mascota
    getAdopcionByUsuarioId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { IdUsuario } = req.query;
                let adopciones = yield Adopcion_1.Adopcion.findAll({
                    where: {
                        IdUsuario: IdUsuario
                    },
                    include: [
                        {
                            model: Mascota_1.Mascota
                        }
                    ],
                    transaction: transaction
                });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', result: adopciones });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    //Este endpoint trae los adopciones y usuarios que se postularon a adoptar a la mascota
    getAdopcionByMascotaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { IdMascota } = req.query;
                let adopciones = yield Adopcion_1.Adopcion.findAll({
                    where: {
                        IdMascota: IdMascota
                    },
                    include: [
                        {
                            model: Usuario_1.Usuario,
                            attributes: ['userName', 'nombre', 'linkFotoPerfil']
                        }
                    ],
                    transaction: transaction
                });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', result: adopciones });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    //Este endpoint sirve para bajar la bandera de notificacion de que el usuario fue elegido para adoptar a la mascota
    notificacionVistaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { idAdopcion } = req.body;
                yield Adopcion_1.Adopcion.update({
                    notificado: true
                }, {
                    where: {
                        id: idAdopcion
                    },
                    transaction: transaction
                });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: '', result: true });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    //Este endpoint sirve para que el admin le asigne a un usuario la adopcion
    aprobarAdopcionAUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { IdUsuario, IdMascota } = req.body;
                let mascotaFounded = yield Mascota_1.Mascota.findOne({
                    where: {
                        id: IdMascota
                    },
                    transaction: transaction
                });
                if (!mascotaFounded)
                    throw new Error("No se encontro la mascota");
                if (mascotaFounded.estado && mascotaFounded.estado == 'adoptado')
                    throw new Error("Esta mascota ya se adopto");
                yield Adopcion_1.Adopcion.update({
                    elegido: true
                }, {
                    where: {
                        IdUsuario: IdUsuario,
                        IdMascota: IdMascota,
                    },
                    transaction: transaction
                });
                yield Mascota_1.Mascota.update({
                    estado: 'adoptado'
                }, {
                    where: {
                        id: IdMascota
                    },
                    transaction: transaction
                });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: 'Se actualizo adopción y estado de la mascota', result: true });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    createAdopcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { IdUsuario, IdMascota } = req.body;
                let adopcionFounded = yield Adopcion_1.Adopcion.findOne({
                    where: {
                        IdUsuario: IdUsuario,
                        IdMascota: IdMascota,
                    },
                    transaction: transaction
                });
                if (adopcionFounded)
                    throw new Error("No puede mandar dos solicitudes para la misma mascota");
                const adopcion = yield Adopcion_1.Adopcion.create({
                    IdUsuario: IdUsuario,
                    IdMascota: IdMascota,
                    notificado: false,
                    elegido: false
                }, { transaction: transaction });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: 'Se creo adopción correctamente', result: adopcion });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
}
exports.default = AlbumController;
AlbumController.instance = new AlbumController();
