import { tratarHandShake } from "./tratarHandShake";
import { servidorWebSocket } from "./webSocketService";

export function tratarEventosWebSockets() {
    
    const socket = servidorWebSocket.socketServer;

    socket.on("connection", (client) => {
        client.on("handshake", tratarHandShake(client));
    });
}


