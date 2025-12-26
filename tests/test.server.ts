import { serverapp } from '../src/presentation/server';
import { envs } from '../src/config/env';
import { Approuters } from '../src/routes/routes';





export const testServer = new serverapp({
    port: envs.PORT,
    router: Approuters.routes
});