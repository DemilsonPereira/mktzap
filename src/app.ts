require('dotenv').config();
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import "express-async-errors";
import { router } from './routes';


class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.middlewares();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3333);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.get('/', (request: Request, response: Response) => {
            response.json({ msg: "Serve Online!." });
        });
        this.app.use(router);
        this.app.use(
            (err: Error, resquest: Request, response: Response, next: NextFunction) => {
                if (err instanceof Error) {
                    return response.status(400).json({
                        error: err.message
                    });
                }

                return response.status(500).json({
                    status: "error",
                    message: "Internal Server Error"
                })
            });
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        })
    }
}

export {
    Server
}
