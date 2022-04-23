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
    getMascotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let params = req.params;
                let fotos = yield Mascota_1.Mascota.findAll({
                    where: {
                        estado: {
                            [sequelize_1.Op.ne]: 'adoptado'
                        }
                    },
                    transaction: transaction
                });
                yield transaction.commit();
                return res.status(201).send({ error: false, message: 'Se encontró el album', result: fotos });
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
                let { nombre, raza, tipo, sexo, Base64FotoPerfil, } = req.body;
                let linkFotoS3;
                if (Base64FotoPerfil)
                    linkFotoS3 = yield awsService_1.default.instance.uploadFoto(Base64FotoPerfil, true);
                const mascota = yield Mascota_1.Mascota.create({
                    nombre: nombre,
                    raza: raza,
                    tipo: tipo,
                    sexo: sexo,
                    estado: 'en adopcion',
                    linkFotoPerfil: linkFotoS3 && linkFotoS3.Location ? linkFotoS3.Location : ''
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
