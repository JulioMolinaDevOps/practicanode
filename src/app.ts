import { envs } from './config/env';
import {serverapp } from "./presentation/server";
import { Approuters } from './routes/routes';



(async () => {
    main();
})();

function main() {
    const server = new serverapp({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        router: Approuters.routes
    })

    server.start();
}

