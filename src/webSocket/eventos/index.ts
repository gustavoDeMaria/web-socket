import { Eventos } from "../enum/Eventos";
import { tratarDisconnect } from "./tratarDisconnect";
import { tratarHandShake } from "./tratarHandShake";
import { tratarNewMessage } from "./tratarNewMessage";
import { SocketServer } from "../SocketServer";
import { tratarUserOnline } from "./tratarUserOnline";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketIO } from "../SocketIO";

export function tratarEventosWebSockets(server: SocketServer) {
    server.socketServer.on(Eventos.connection, (client) => {
        client.on(Eventos.handshake, tratarHandShake(server, client));
        client.on(Eventos.disconnect, tratarDisconnect(server, client));
        client.on(Eventos.new_message, tratarNewMessage(server, client));
        client.on(Eventos.user_online_request, tratarUserOnline(server, client));
        client.on(Eventos.message_received, tratarMessageReceived(server, client));

        client.join("windows");
    });

    server.socketServer.socketsJoin("windows");
}

function tratarMessageReceived(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return () => {
        const user = server.obterClient(client.id)?.UsuarioIntranet;
        console.log(`${user} recebeu a mensagem!`);
    };
}

