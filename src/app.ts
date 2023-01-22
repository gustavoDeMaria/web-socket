import express from "express";
import { Server, createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { router } from "./router/router";
import { tratarEventosWebSockets as tratarEventosWebSockets } from "./webSocket/TratarEventosWebSockets";
import { servidorWebSocket } from "./webSocket/webSocketService";

export class App {

    private app: express.Application;
    private socket: SocketServer;
    public httpServer: Server;

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.socket = new SocketServer(this.httpServer, { /* options */ });
        this.middleware();
        this.router();
        this.websockets();
        servidorWebSocket.servidorooo = this.socket;
    }

    public middleware() {
        this.app.use(express.json());
    }

    public router() {
        this.app.use(router);
    }

    public websockets() {
        tratarEventosWebSockets(this.socket);
    }
}
