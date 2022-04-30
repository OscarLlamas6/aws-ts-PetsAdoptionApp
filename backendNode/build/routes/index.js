"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuario_1 = require("../routes/Usuario");
const Adopcion_1 = require("./Adopcion");
const Mascota_1 = require("./Mascota");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use('/usuario', Usuario_1.Usuario);
        this.router.use('/adopcion', Adopcion_1.Adopcion);
        this.router.use('/mascota', Mascota_1.Mascota);
        this.router.get('/', (req, res) => {
            res.send({
                Instancia: 'NodeJs'
            });
        });
    }
}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
