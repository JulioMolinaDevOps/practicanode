import { envs } from './config/env';
import { Server } from "./presentation/server";
import { Approuters } from './routes/routes';



(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        router: Approuters.routes
    })

    server.start();
}

