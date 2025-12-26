import { CreatetodoDTO } from "../dtos";
import { todoEntity } from "../entity/todo.entity";
import { todoRepository } from "../repositories/repositories.todo";


export interface createtodocase{
    execute(dtos:CreatetodoDTO): Promise<todoEntity>;

}

export class createTodoCase implements createtodocase {
    constructor(private readonly todoRepository: todoRepository){
        
    }
    
    execute(dtos: CreatetodoDTO): Promise<todoEntity> {
        return this.todoRepository.create(dtos);
    }
    
}