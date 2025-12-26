import request from "supertest";
import { testServer } from "../test.server";
import { prisma } from "../../src/data/postgrest";


//probrar llamada de las apis
describe("Router Controller", () => {


    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(() => {
        testServer.close();
    });

    afterEach(async () => {
        await prisma.todo.deleteMany();
    });

    const todo1 = { id: 8, nombre: "jose", age: 20 }
    const todo2 = { id: 9, nombre: "maria", age: 25 }


    test('should create an instance of TodoRouters', async () => {

        await prisma.todo.deleteMany();
        await prisma.todo.createMany({
            data: [todo1, todo2]
        });


        const { body } = await request(testServer.app)
            .get('/api')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].nombre).toBe(todo1.nombre);


    });


    test('should get a todo by id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .get(`/api/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            nombre: todo.nombre,
            age: todo.age
        })

    })


    /* test('should return 400 if todo not found', async () => {

        const id = 9999;
        const { body } = await request(testServer.app)
            .get(`/api/${id}`)
            .expect(400);
        expect(body).toEqual({ message: 'Internal server error', error: 'Todo with id 9999 not found' });
    });
 */
    test('should return a new todo', async () => {
        const { body } = await request(testServer.app)
            .post('/api')
            .send(todo1)
            .expect(201);


        expect(body).toEqual({
            id: expect.any(Number),
            nombre: todo1.nombre,
            age: todo1.age
        })
    });

    test('should return an error if nombre is missing', async () => {
        const { body } = await request(testServer.app)
            .post('/api')
            .send({})
            .expect(400);

        expect(body).toEqual({
            message: 'Nombre is required'
        })
    });

    test('should return an update todo api/:id', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const updatedData = { nombre: "updatedName", age: 30 };

        const { body } = await request(testServer.app)
            .put(`/api/${todo.id}`)
            .send(updatedData)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            nombre: updatedData.nombre,
            age: updatedData.age
        });

    });

    test('should return 400 si el todo no existe para actualizar', async () => {
        const id = 9999;

        const { body } = await request(testServer.app)
            .put(`/api/${id}`)
            .send({ nombre: "newName", age: 40 })
            .expect(400);
        expect(body).toEqual({ message: 'Todo with id 9999 not found' });

    });

    test('should return an update Todo only the date should be updated', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });
        const updatedData = { nombre: "onlyNameUpdated" };

        const { body } = await request(testServer.app)
            .put(`/api/${todo.id}`)
            .send(updatedData)
            .expect(200);
        expect(body).toEqual({
            id: todo.id,
            nombre: updatedData.nombre,
            age: todo.age
        })
    });

    test('should delete a todo by id', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });
        await request(testServer.app)
            .delete(`/api/${todo.id}`)
            .expect(200);
        const deletedTodo = await prisma.todo.findUnique({ where: { id: todo.id } });
        expect(deletedTodo).toBeNull();
    });

    test('should return 400 if todo to delete not found', async () => {
        const id = 9999;
        const { body } = await request(testServer.app)
            .delete(`/api/${id}`)
            .expect(400);
        console.log(body);
    });

































});
