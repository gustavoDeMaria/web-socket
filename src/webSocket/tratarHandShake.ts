import { clienteIdentificacao } from "../cliente/clienteIdentificacao";
import { Eventos } from "./enum/Eventos";
import { SocketIO } from "./SocketIO";
import { SocketServer } from "./webSocketService";

export function tratarHandShake(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return (handshake: clienteIdentificacao) => {

        server.adicionaClienteConectado(client, handshake);

        console.log("Conectado: ", client.id);

        client.emit(Eventos.handshake_sucess, { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });

    };
}


