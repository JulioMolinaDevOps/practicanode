

export class CreatetodoDTO {

    private constructor(public readonly nombre: string, public readonly age: number) { }


    static create(props: { [key: string]: any }): [string?, CreatetodoDTO?] {
        const { nombre, age } = props;

        if (!nombre || nombre.trim() === '') {
            return ['Nombre is required'];
        }
        if (typeof nombre !== 'string') {
            return ['Nombre must be a string'];
        }

        const dto = new CreatetodoDTO(nombre, age ?? 0);

        return [undefined!, dto];

    }





}