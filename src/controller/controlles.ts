import { Request, Response } from "express";
import { isStringObject } from "util/types";

const Todos = [
    { id: 1, "nombre": 'jose', "age": 25 },
    { id: 2, "nombre": 'maria', "age": 30 },
    { id: 3, "nombre": 'pedro', "age": 35 },
    { id: 4, "nombre": 'lucia', "age": 28 }
]


export class TodoControlles {

    //DI
    constructor() { }

    public getTodos(req: Request, res: Response) {
        res.json(
            Todos
        );
    }
    public getId(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numberId = Number(id);

        if (isNaN(numberId)) {
            return res.status(400).json({ message: 'ID must be a number' });
        }

        const todo = Todos.find(t => t.id === numberId);

        if (!todo) {
            return res.status(404).json({ message: 'ID not found' });
        }

        res.json(todo);
    }

    public createTodo(req: Request, res: Response) {

        const { nombre, age } = req.body;


        if (!nombre) {
            return res.status(400).json({ message: 'Nombre is required' });
        }

        if (isStringObject(nombre)) {
            return res.status(400).json({ message: 'Nombre must be a string' });
        }

        const newTodo = {
            id: Todos.length + 1,
            nombre,
            age
        };
        Todos.push(newTodo);
        res.status(201).json(newTodo);
    }

    public updateTodo(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, age } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const todo = Todos.find(todo => todo.id === numericId);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.nombre = nombre || todo.nombre;
        (age == null || age == undefined)
            ? todo.age = age
            : todo.age = todo.age;
        res.json(todo);

    }

    public deleteTodo(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const todoIndex = Todos.findIndex(todo => todo.id === numericId);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        Todos.splice(todoIndex, 1);
        res.status(204).send();
        return;
    }





}


