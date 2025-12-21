import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number
    publicPath?: string
    router: Router
}

export class Server {
    private app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly router: Router

    constructor(private options: Options) {
        const { port, publicPath = 'public', router } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.router = router
    }

    async start() {

        //Middleware to parse JSON
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));




        //public folder
        this.app.use(express.static(this.publicPath));

        //Routes
        /* this.app.get('/api', (req, res) => {
            res.json({ status: 'ok' });
        }); */
        this.app.use(this.router);


        //SPA
        this.app.get(/.*/, (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });

    }
}