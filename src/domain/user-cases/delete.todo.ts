import { todoEntity } from "../entity/todo.entity";
import { todoRepository } from "../repositories/repositories.todo";

export interface deleteuseCase {
    execute(id: number): Promise<todoEntity>;

}

export class deleteTodoCase implements deleteuseCase {
    constructor(private readonly todoRepository: todoRepository) {

    }

    execute(id: number): Promise<todoEntity> {
        return this.todoRepository.delete(id);
    }

}