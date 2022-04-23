import { Router } from 'express';
import controller from '../controllers/Usuario'

export const Usuario = Router();

Usuario.post('/createUser', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.createUser(req, res)
});

Usuario.post('/login', function (req, res) { // TODO: Seguridad de endpoint
    controller.instance.login(req, res)
});

// Usuario.get('/', function (req, res) { // TODO: Seguridad de endpoint
// });

// Usuario.post('/loginFacial', function (req, res) { // TODO: Seguridad de endpoint
//     controller.instance.loginFacial(req, res)
// });

// Usuario.get('/getTagsFotoPerfil', function (req, res) { // TODO: Seguridad de endpoint
//     controller.instance.getTagsFotoPerfil(req, res)
// });

// Usuario.put('/updateUsuario', function (req, res) { // TODO: Seguridad de endpoint
//     controller.instance.updateUser(req, res)
// });

// Usuario.put('/updateFotoPerfil', function (req, res) { // TODO: Seguridad de endpoint
//     controller.instance.updateFotoPerfil(req, res)
// });