import { Request, Response } from "express";
import { isStringObject } from "util/types";
import { prisma } from "../data/postgrest";
import { CreatetodoDTO } from "../domain/dtos";
import { UpdateTodoDto } from '../domain/dtos/todos/update-todo';


export class TodoControlles {

    //DI
    constructor() { }

    public async getTodos(req: Request, res: Response) {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }


    public async getId(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numberId = Number(id);

        if (isNaN(numberId)) {
            return res.status(400).json({ message: 'ID must be a number' });
        }

        const todo = await prisma.todo.findFirst({
            where: { id: numberId }
        });

        (!todo) ? res.status(404).json({ message: 'Todo not found' }) : res.json(todo);
    }




    public async createTodo(req: Request, res: Response) {

        const [createTodoError, createTodo] = CreatetodoDTO.create(req.body);

        if (createTodoError) {
            return res.status(400).json({ message: createTodoError });
        }





        const todo = await prisma.todo.create({
            data: createTodo!
        });


        res.status(201).json(todo);
    }

    public async updateTodo(req: Request, res: Response) {
        const { id } = req.params;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

        if (error) {
            return res.status(400).json({ message: error });
        }

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const findtodo = await prisma.todo.findFirst({
            where: { id: numericId }
        });

        if (!findtodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const updatedTodo = await prisma.todo.update({
            where: { id: numericId },
            data: updateTodoDto!.values
        });
        res.json(updatedTodo);
    }

    public async deleteTodo(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const findtodo = await prisma.todo.findFirst({
            where: { id: numericId }
        });

        if (!findtodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await prisma.todo.delete({
            where: { id: numericId }
        });
        res.status(204).send();
    }





}


