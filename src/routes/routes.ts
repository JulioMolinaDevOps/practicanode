import { Router } from "express";
import { TodoControlles } from "../controller/controlles";
import { TodoRouters } from "../controller/routes";

export class Approuters {
    static get routes(): Router {

        const router = Router();


        router.use('/api', TodoRouters.routes);

        return router;
    }
}