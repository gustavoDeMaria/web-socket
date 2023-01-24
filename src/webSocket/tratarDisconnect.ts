import { SocketIO } from "./SocketIO";
import { SocketServer } from "./webSocketService";

export function tratarDisconnect(server: SocketServer, client: SocketIO) {
    server.removerClienteConectado(client);
    console.log("Disconectado: ", client.id);
}
