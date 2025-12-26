/* import { Request, Response } from "express";
import { isStringObject } from "util/types";
import { prisma } from "../data/postgrest";
import { CreatetodoDTO } from "../domain/dtos";
import { UpdateTodoDto } from '../domain/dtos/todos/update-todo';
import { todoRepository } from "../domain";


export class TodoControlles {

    //DI
    constructor(private readonly repository: todoRepository) { }



    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.repository.findAll();
        res.json(todos);
    }


    public getId = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numberId = Number(id);

        if (isNaN(numberId)) {
            return res.status(400).json({ message: 'ID must be a number' });
        }

        const todo = await this.repository.findById(numberId);


        (!todo) ? res.status(404).json({ message: 'Todo not found' }) : res.json(todo);
    }




    public createTodo = async (req: Request, res: Response) => {

        const [createTodoError, createTodo] = CreatetodoDTO.create(req.body);

        if (createTodoError) {
            return res.status(400).json({ message: createTodoError });
        }

        const todo = await this.repository.create(createTodo!);

        res.status(201).json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
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

        const findtodo = await this.repository.findById(numericId);

        if (!findtodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const updatedTodo = await this.repository.update(updateTodoDto!);
        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const findtodo = await this.repository.findById(numericId);

        if (!findtodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const deletedtodo = await this.repository.delete(numericId);

        return res.json(deletedtodo);
    }


}


 */