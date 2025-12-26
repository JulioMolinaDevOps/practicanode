import { todoEntity } from "../entity/todo.entity";
import { CreatetodoDTO } from '../dtos/todos/create-todo';
import { UpdateTodoDto } from "../dtos/todos/update-todo";


export abstract class todoRepository {

    abstract create(createTodoDTO: CreatetodoDTO): Promise<todoEntity>;
    abstract findAll(): Promise<todoEntity[]>;
    abstract findById(id: number): Promise<todoEntity>;
    abstract update(updateTodoDTO: UpdateTodoDto): Promise<todoEntity>;
    abstract delete(id: number): Promise<todoEntity>;

}