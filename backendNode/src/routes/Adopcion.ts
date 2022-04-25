import { Router } from 'express';
import controller from '../controllers/Adopcion'

export const Adopcion = Router();

Adopcion.post('/createAdopcion', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.createAdopcion(req, res)
});

Adopcion.put('/aprobarAdopcionAUsuario', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.aprobarAdopcionAUsuario(req, res)
});

Adopcion.put('/notificacionVistaUsuario', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.notificacionVistaUsuario(req, res)
});

Adopcion.get('/getAdopcionByMascotaId', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.getAdopcionByMascotaId(req, res)
});

Adopcion.get('/getAdopcionByUsuarioId', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.getAdopcionByUsuarioId(req, res)
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