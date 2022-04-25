import { Router } from 'express';
import controller from '../controllers/Mascota'

export const Mascota = Router();

Mascota.get('/getMascotaDescriptionAudio', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.getMascotaDescriptionAudio(req, res)
});

Mascota.get('/traducirMascotaDescription', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.traducirMascotaDescription(req, res)
});

Mascota.get('/getMascotaTags', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.getMascotaTags(req, res)
});

Mascota.post('/createMascota', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.createMascota(req, res)
});

Mascota.get('/getMascotasEnAdopcion', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.getMascotasEnAdopcion(req, res)
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