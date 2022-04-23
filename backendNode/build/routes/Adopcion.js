"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adopcion = void 0;
const express_1 = require("express");
const Adopcion_1 = __importDefault(require("../controllers/Adopcion"));
exports.Adopcion = (0, express_1.Router)();
exports.Adopcion.post('/createAdopcion', function (req, res) {
    Adopcion_1.default.instance.createAdopcion(req, res);
});
// Adopcion.put('/editarAlbum', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.updateAlbum(req, res)
// });
// Adopcion.delete('/eliminarAlbum/:idAlbum', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.deleteAlbum(req, res)
// });
// Adopcion.get('/getAlbum/:idAlbum', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.getAlbum(req, res)
// });
// Adopcion.get('/getAlbums/:idUsuario', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.getAlbums(req, res)
// });
