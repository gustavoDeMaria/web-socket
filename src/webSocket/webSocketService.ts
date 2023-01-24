import { Server as SocketServer } from "socket.io";
import { Server  } from "http";
import { tratarEventosWebSockets } from "./tratarEventosWebSockets";


export class StaticSocketServer
{
    public socketServer!: SocketServer;
    public Start(httpServer: Server): void{
        this.socketServer =  new SocketServer(httpServer, { /* options */ });
        tratarEventosWebSockets();
    }
}

export const servidorWebSocket: StaticSocketServer = new StaticSocketServer()