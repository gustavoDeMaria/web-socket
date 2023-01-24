import { Eventos } from "./enum/Eventos";
import { tratarDisconnect } from "./tratarDisconnect";
import { tratarHandShake } from "./tratarHandShake";
import { SocketServer } from "./webSocketService";

export function tratarEventosWebSockets(server: SocketServer) {
    server.socketServer.on(Eventos.connection, (client) => {
        client.on(Eventos.handshake, tratarHandShake(server, client));

        client.on(Eventos.disconnect, () => tratarDisconnect(server, client));
    });
}