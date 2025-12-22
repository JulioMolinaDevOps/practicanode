

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly age?: number,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre !== undefined) {
            returnObj.nombre = this.nombre;
        }
        if (this.age !== undefined) {
            returnObj.age = this.age;
        }


        return returnObj;
    }


    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, nombre, age } = props;
        if (id === undefined || id === null) {
            return ['ID is required'];
        }
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return ['ID must be a number'];
        }

        if (nombre !== undefined && typeof nombre !== 'string') {
            return ['Nombre must be a string'];
        }
        if (age !== undefined && typeof age !== 'number') {
            return ['Age must be a number'];
        }
        const dto = new UpdateTodoDto(numericId, nombre, age);

        return [undefined!, dto];
    }


}