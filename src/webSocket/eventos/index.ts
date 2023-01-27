import { Eventos } from "../enum/Eventos";
import { tratarDisconnect } from "./tratarDisconnect";
import { tratarHandShake } from "./tratarHandShake";
import { tratarNewMessage } from "./tratarNewMessage";
import { SocketServer } from "../SocketServer";

export function tratarEventosWebSockets(server: SocketServer) {
    server.socketServer.on(Eventos.connection, (client) => {
        client.on(Eventos.handshake, tratarHandShake(server, client));
        client.on(Eventos.disconnect, tratarDisconnect(server, client));
        client.on(Eventos.new_message, tratarNewMessage(server, client));
    });
}
