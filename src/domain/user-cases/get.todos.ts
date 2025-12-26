import { todoEntity } from "../entity/todo.entity";
import { todoRepository } from "../repositories/repositories.todo";
import { get } from 'env-var';

export interface getodouseCaseid {
    execute(): Promise<todoEntity[]>;

}

export class getTodosCase implements getodouseCaseid {
    constructor(private readonly todoRepository: todoRepository) {

    }

    execute(): Promise<todoEntity[]> {
        return this.todoRepository.findAll();
    }

}