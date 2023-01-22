import { Server as SocketServer } from "socket.io";
import { tratarHandShake } from "./tratarHandShake";


export function tratarEventosWebSockets(socket: SocketServer) {
    socket.on("connection", (client) => {
        client.on("handshake", tratarHandShake(client));
    });
}


