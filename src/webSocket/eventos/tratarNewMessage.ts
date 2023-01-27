import { Console } from "console";
import { eventNames } from "process";
import { Message } from "../../models/message";
import { Eventos } from "../enum/Eventos";
import { SocketIO } from "../SocketIO";
import { SocketServer } from "../SocketServer";

export function tratarNewMessage(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return (message: Message) => {
        console.log(message)
        if (message) {

            const from = server.obterClient(client.id)?.UsuarioIntranet;
            console.log("from: ", from);

            if (from) {
                message.from = from;

                if (message.to?.length > 0) {
                    message.to.forEach(user => {
                        server.enviarMensagemTo(user, Eventos.new_message,  { from: from, message: message });
                    });
                }
                else {
                    console.log("else")
                    server.clientesConectados.forEach(user => {
                        console.log(client.id, user.socket.id)
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
