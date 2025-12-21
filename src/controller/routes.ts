import { Router } from "express";
import { TodoControlles } from "./controlles";

export class TodoRouters {
    static get routes(): Router {

        const router = Router();
        const todoControlles = new TodoControlles();

        router.get('/', todoControlles.getTodos)
        router.get('/:id', todoControlles.getId);
        router.post('/', todoControlles.createTodo);
        router.put('/:id', todoControlles.updateTodo);
        router.delete('/:id', todoControlles.deleteTodo);

        return router;
    }
}