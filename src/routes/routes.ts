import { Router } from "express";
import { TodoRouters } from "../controller/routes";

export class Approuters {
    static get routes(): Router {

        const router = Router();


        router.use('/api', TodoRouters.routes);

        return router;
    }
}