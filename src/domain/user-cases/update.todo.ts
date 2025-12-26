import { UpdateTodoDto } from "../dtos/todos/update-todo";
import { todoEntity } from "../entity/todo.entity";
import { todoRepository } from "../repositories/repositories.todo";

export interface todoupdatecase {
    execute(dtos: UpdateTodoDto): Promise<todoEntity>;

}

export class updateTodoCase implements todoupdatecase {
    constructor(private readonly todoRepository: todoRepository) {

    }

    execute(dtos: UpdateTodoDto): Promise<todoEntity> {
        return this.todoRepository.update(dtos);
    }

}