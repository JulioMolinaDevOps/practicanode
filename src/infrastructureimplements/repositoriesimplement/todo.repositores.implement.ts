import { CreatetodoDTO, todoDatasource, todoEntity, todoRepository } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo";


export class todoRepositoryImplements implements todoRepository {

    constructor(private readonly dataSource: todoDatasource) {

    }

    create(createTodoDTO: CreatetodoDTO): Promise<todoEntity> {
        return this.dataSource.create(createTodoDTO);
    }
    findAll(): Promise<todoEntity[]> {
        return this.dataSource.findAll();
    }
    findById(id: number): Promise<todoEntity> {
        return this.dataSource.findById(id);
    }
    update(updateTodoDTO: UpdateTodoDto): Promise<todoEntity> {
        return this.dataSource.update(updateTodoDTO);
    }
    delete(id: number): Promise<todoEntity> {
        return this.dataSource.delete(id);
    }
}