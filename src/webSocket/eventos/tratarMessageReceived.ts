import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";

export function tratarMessageReceived(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return () => {
        const user = server.obterClient(client.id)?.UsuarioIntranet;
        console.log(`${user} recebeu a mensagem!`);
    };
}
