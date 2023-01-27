import { Eventos } from "../enum/Eventos";
import { SocketIO } from "../SocketIO";
import { SocketServer } from "../SocketServer";

export function tratarDisconnect(server: SocketServer, client: SocketIO) : (...args: any[]) => void {
    return (event) => {

    const user = server.obterClient(client.id)?.UsuarioIntranet;
    
    server.removerClienteConectado(client);
    
    if(user)
    {
        server.enviarMensagemExceptTo(Eventos.status_changed, `${user} desconectou-se!`, client.id);
    }

    console.log("Disconectado: ", client.id);
}
}
