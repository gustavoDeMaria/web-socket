import express from "express";
import { Server, createServer } from "http";
import { router } from "./router/router";
import { servidorWebSocket } from "./webSocket/webSocketService";

export class App {

    private app: express.Application;
    public httpServer: Server;

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.middleware();
        this.router();
        servidorWebSocket.Start(this.httpServer);
    }

    public middleware() {
        this.app.use(express.json());
    }

    public router() {
        this.app.use(router);
    }
}
