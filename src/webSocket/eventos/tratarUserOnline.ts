import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { Eventos } from "../enum/Eventos";
import { IUsuarioOnline, UsuariosOnline } from "../../models/UsuariosOnline";

export function tratarUserOnline(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return () => {        
        obterUsuarios(server, client);
    }   
}

export  function obterUsuarios(server: SocketServer, client: SocketIO) {
    const clientes: UsuariosOnline = new UsuariosOnline();

    server.clientesConectados.forEach(user => clientes.usuarios.push(user.handshake as unknown as IUsuarioOnline));

    server.enviarMensagem(Eventos.user_online_response, clientes);

    console.log(server.clientesConectados)
}