import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    // requerido y convertido a número
    PORT: get('PORT').required().asPortNumber(),
    //requerido y convertido a string con valor por defecto
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}