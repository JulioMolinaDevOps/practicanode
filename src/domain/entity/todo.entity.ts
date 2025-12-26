export class todoEntity {

    constructor(
        public id: number,
        public nombre: string,
        public age: number,
    ) { }

    get isCompleted() {
        return !!this.age;
    }

    public static fromObject(obj: { [key: string]: any }): todoEntity {
        const { id, nombre, age } = obj;
        if (!id) throw new Error('ID is required to create a todoEntity');
        if (!nombre) throw new Error('Nombre is required to create a todoEntity');
        if (age === undefined || age === null) throw new Error('Age is required to create a todoEntity');
        return new todoEntity(id, nombre, age);
    }













}