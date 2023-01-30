import { Message } from "../../models/message";
import { Eventos } from "../enum/Eventos";
import { SocketIO } from "../SocketIO";
import { SocketServer } from "../SocketServer";

export function tratarNewMessage(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return (message: Message) => {
        console.log(message);
        if (message) {

            const from = server.obterClient(client.id)?.UsuarioIntranet;
            if (from) {
                message.from = from;

                if (message.to?.length > 0) {
                    for (let user of message.to) {
                        const to = server.obterSocketClient(user);
                        if (to) {
                            server.enviarMensagemTo(to.id, Eventos.new_message, { from: from, message: message });
                        }
                    };
                }
                else {

                    server.clientesConectados.forEach(user => {
                        console.log(client.id, user.socket.id);
                        if (client.id !== user.socket.id) {
                            server.enviarMensagemTo(user?.socket.id, Eventos.new_message,
                                { from: from, message: message });
                        }
                    });
                }
            }
        }
    };
}
