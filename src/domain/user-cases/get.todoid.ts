
import { todoEntity } from "../entity/todo.entity";
import { todoRepository } from "../repositories/repositories.todo";
import { get } from 'env-var';

export interface getodouseCase {
    execute(dtos: number): Promise<todoEntity>;

}

export class getTodoByIdCase implements getodouseCase {
    constructor(private readonly todoRepository: todoRepository) {

    }

    execute(dtos: number): Promise<todoEntity> {
        return this.todoRepository.findById(dtos);
    }

}