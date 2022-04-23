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
class AlbumController {
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
