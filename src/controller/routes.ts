import { Router } from "express";
import { TodoControlles } from "./controlles";
import { todoRepositoryImplements } from "../infrastructureimplements/repositoriesimplement/todo.repositores.implement";
import { todoimplement } from "../infrastructureimplements/datasourceimple/todo.datasourceimplemen";

export class TodoRouters {
    static get routes(): Router {

        const router = Router();
        const datasource = new todoimplement();
        const repository = new todoRepositoryImplements(datasource);
        const todoControlles = new TodoControlles(repository);

        router.get('/', todoControlles.getTodos)
        router.get('/:id', todoControlles.getId);
        router.post('/', todoControlles.createTodo);
        router.put('/:id', todoControlles.updateTodo);
        router.delete('/:id', todoControlles.deleteTodo);

        return router;
    }
}