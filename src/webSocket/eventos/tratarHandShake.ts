import { clienteIdentificacao } from "../../cliente/clienteIdentificacao";
import { Eventos } from "../enum/Eventos";
import { SocketIO } from "../SocketIO";
import { SocketServer } from "../SocketServer";
import { obterUsuarios } from "./tratarUserOnline";

export function tratarHandShake(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return (handshake: clienteIdentificacao) => {

        server.adicionaClienteConectado(client, handshake);

        setTimeout(() => {
            obterUsuarios(server, client);
        }, 1000); 

        console.log("Conectado: ", client.id, "usuário: ", handshake?.UsuarioIntranet);

        client.emit(Eventos.handshake_sucess, { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
        
        server.enviarMensagemExceptTo(Eventos.status_changed, `${handshake.UsuarioIntranet} está online`, client.id);
    };
}


