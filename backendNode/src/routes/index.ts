import { Router } from "express";
import { Usuario } from '../routes/Usuario'
import { Adopcion } from './Adopcion'
import { Mascota } from './Mascota'

class IndexRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use('/usuario', Usuario)
        this.router.use('/adopcion', Adopcion)
        this.router.use('/mascota', Mascota)
        this.router.get('/', (req, res) => {
            res.send({
                Instancia: 'NodeJs'
            })
        })
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;
