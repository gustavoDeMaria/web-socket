import { Eventos } from "../enum/Eventos";
import { tratarDisconnect } from "./tratarDisconnect";
import { tratarHandShake } from "./tratarHandShake";
import { tratarNewMessage } from "./tratarNewMessage";
import { SocketServer } from "../SocketServer";
import { tratarUserOnline } from "./tratarUserOnline";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { tratarMessageReceived } from "./tratarMessageReceived";
import { tratarCategoriaRequest } from "./tratarCategoriaRequest";

export function tratarEventosWebSockets(server: SocketServer) {
    server.socketServer.on(Eventos.connection, (client) => {
        client.on(Eventos.handshake, tratarHandShake(server, client));
        client.on(Eventos.disconnect, tratarDisconnect(server, client));
        client.on(Eventos.new_message, tratarNewMessage(server, client));
        client.on(Eventos.user_online_request, tratarUserOnline(server, client));
        client.on(Eventos.message_received, tratarMessageReceived(server, client));
        client.on(Eventos.categoria_request, tratarCategoriaRequest(server, client));

        client.join("windows");
    });

    server.socketServer.socketsJoin("windows");
}


