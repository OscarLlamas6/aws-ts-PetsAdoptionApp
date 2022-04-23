import { Router } from 'express';
import controller from '../controllers/Mascota'

export const Mascota = Router();

Mascota.post('/createMascota', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.createMascota(req, res)
});

Mascota.get('/getMascotas', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.getMascotas(req, res)
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