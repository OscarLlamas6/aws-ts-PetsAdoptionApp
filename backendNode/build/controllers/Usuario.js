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
const sequalize_1 = require("../sequalize");
const Usuario_1 = require("../models/Usuario");
const awsService_1 = __importDefault(require("../services/awsService"));
const passwordUtil_1 = __importDefault(require("../utils/passwordUtil"));
class UsuarioController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { userName, password, Base64FotoPerfil, nombre } = req.body;
                const usuarioEncontrado = yield Usuario_1.Usuario.findOne({
                    where: {
                        userName: userName,
                    },
                    transaction: transaction
                });
                if (usuarioEncontrado)
                    throw new Error('Este username ya existe');
                let passEncryptada = passwordUtil_1.default.instance.encryptPassword(password);
                let linkFotoS3;
                if (Base64FotoPerfil)
                    linkFotoS3 = yield awsService_1.default.instance.uploadFoto(Base64FotoPerfil, true);
                const usuario = yield Usuario_1.Usuario.create({
                    userName: userName,
                    nombre: nombre,
                    password: passEncryptada,
                    linkFotoPerfil: linkFotoS3 && linkFotoS3.Location ? linkFotoS3.Location : '',
                    rol: 'user'
                }, { transaction: transaction });
                yield transaction.commit();
                return res.status(201).send({ error: false, mensaje: 'Registro exitoso', result: true });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield sequalize_1.sequelize.transaction();
            try {
                let { userName, password } = req.body;
                const usuario = yield Usuario_1.Usuario.findOne({
                    where: {
                        userName: userName,
                    },
                    transaction: transaction
                });
                if (!usuario)
                    throw new Error('Este usuario aun no esta registrado');
                let matchPasword = passwordUtil_1.default.instance.comparePassword(password, usuario.password);
                if (!matchPasword)
                    throw new Error('Contraseña incorrecta');
                usuario.password = '';
                yield transaction.commit();
                return res.status(201).send({ error: false, message: 'Login exitoso', result: usuario });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).send({ error: true, message: error.message });
            }
        });
    }
}
exports.default = UsuarioController;
UsuarioController.instance = new UsuarioController();
