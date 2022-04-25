"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mascota = void 0;
const express_1 = require("express");
const Mascota_1 = __importDefault(require("../controllers/Mascota"));
exports.Mascota = (0, express_1.Router)();
exports.Mascota.get('/getMascotaDescriptionAudio', function (req, res) {
    Mascota_1.default.instance.getMascotaDescriptionAudio(req, res);
});
exports.Mascota.get('/traducirMascotaDescription', function (req, res) {
    Mascota_1.default.instance.traducirMascotaDescription(req, res);
});
exports.Mascota.get('/getMascotaTags', function (req, res) {
    Mascota_1.default.instance.getMascotaTags(req, res);
});
exports.Mascota.post('/createMascota', function (req, res) {
    Mascota_1.default.instance.createMascota(req, res);
});
exports.Mascota.get('/getMascotasEnAdopcion', function (req, res) {
    Mascota_1.default.instance.getMascotasEnAdopcion(req, res);
});
// Mascota.get('/getFotos/:idAlbum', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.getFotos(req, res)
// });
// Mascota.post('/getTextImagen', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.getTextImagen(req, res)
// });
// Mascota.post('/createFotoAnimal', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.createFotoAnimal(req, res)
// });
// Mascota.post('/translateDescripcionImagen', function (req, res) { // TODO: Seguridad de endpoint
//     // controller.instance.translateDescripcionImagen(req, res)
// });
