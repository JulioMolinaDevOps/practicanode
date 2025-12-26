import { prisma } from "../../data/postgrest";
import { CreatetodoDTO, CustomError, todoDatasource, todoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo";


export class todoimplement implements todoDatasource {


    async create(createTodoDTO: CreatetodoDTO): Promise<todoEntity> {
        const newTodo = await prisma.todo.create({
            data: createTodoDTO!
        });

        return todoEntity.fromObject(newTodo);
    }
    async findAll(): Promise<todoEntity[]> {
        const todos = await prisma.todo.findMany();
        //mapeor a entidad
        return todos.map(todo => todoEntity.fromObject(todo));

    }
    async findById(id: number): Promise<todoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id: id }
        });

        if (!todo) throw new CustomError(`Todo with id ${id} not found`, 400);
        return todoEntity.fromObject(todo)

    }

    async update(updateTodoDTO: UpdateTodoDto): Promise<todoEntity> {
        await this.findById(updateTodoDTO.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDTO.id },
            data: updateTodoDTO!.values
        });

        return todoEntity.fromObject(updatedTodo);


    }
    async delete(id: number): Promise<todoEntity> {
        await this.findById(id);
        const deletedTodo = await prisma.todo.delete({
            where: { id: id }
        });
        return todoEntity.fromObject(deletedTodo);
    }

}