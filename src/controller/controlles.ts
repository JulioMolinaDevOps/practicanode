import { Request, Response } from "express";
import { isStringObject } from "util/types";
import { prisma } from "../data/postgrest";
import { CreatetodoDTO } from "../domain/dtos";
import { UpdateTodoDto } from '../domain/dtos/todos/update-todo';
import { createTodoCase, CustomError, deleteTodoCase, getTodoByIdCase, getTodosCase, todoRepository, updateTodoCase } from "../domain";
import { error } from "console";


export class TodoControlles {

    //DI
    constructor(private readonly repository: todoRepository) { }


    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error', error: 'An unexpected error occurred' });
    }

    public getTodos = (req: Request, res: Response) => {
        new getTodosCase(this.repository)
            .execute()
            .then(todos => { res.status(200).json(todos) })
            .catch(error => this.handleError(res, error)
            );

    }


    public getId = (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numberId = Number(id);

        if (isNaN(numberId)) {
            return res.status(400).json({ message: 'ID must be a number' });
        }

        new getTodoByIdCase(this.repository)
            .execute(numberId)
            .then(todo => { (!todo) ? res.status(404).json({ message: 'Todo not found' }) : res.status(200).json(todo); })
            .catch(error => this.handleError(res, error));


    }




    public createTodo = (req: Request, res: Response) => {

        const [createTodoError, createTodo] = CreatetodoDTO.create(req.body);

        if (createTodoError) {
            return res.status(400).json({ message: createTodoError });
        }

        new createTodoCase(this.repository)
            .execute(createTodo!)
            .then(todo => { res.status(201).json(todo); })
            .catch(error => this.handleError(res, error));
    }

    public updateTodo = (req: Request, res: Response) => {
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

        new updateTodoCase(this.repository)
            .execute(updateTodoDto!)
            .then(updatedTodo => { res.status(200).json(updatedTodo); })
            .catch(error => this.handleError(res, error));

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




        new deleteTodoCase(this.repository)
            .execute(numericId)
            .then(deletedtodo => { res.json(deletedtodo); })
            .catch(error => this.handleError(res, error));

    }





}


