import { clienteIdentificacao } from "../../cliente/clienteIdentificacao";
import { Eventos } from "../enum/Eventos";
import { SocketIO } from "../SocketIO";
import { SocketServer } from "../SocketServer";
import { obterUsuarios } from "./tratarUserOnline";
import { UsuarioController } from "../../controllers/usuarioController";

const usuarioController = new UsuarioController();

export function tratarHandShake(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return async (handshake: clienteIdentificacao) => {

        if (handshake.SenhaIntranetMD5)
        {            
            const valido = await usuarioController.ValidarSenha(handshake.UsuarioIntranet, handshake.Password);

            if (valido){
                server.adicionaClienteConectado(client, handshake);

            setTimeout(() => {
                obterUsuarios(server, client);
            }, 1000); 
    
            console.log("Conectado: ", client.id, "usuário: ", handshake?.UsuarioIntranet);
    
            client.emit(Eventos.handshake_sucess, { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
            
            server.enviarMensagemExceptTo(Eventos.status_changed, `${handshake.UsuarioIntranet} está online`, client.id);
            } 
            else
            {
                server.enviarMensagemTo(client.id, Eventos.new_message, { from: "ADM", message: { content: "Senha informada não confere!", to: [ handshake.UsuarioIntranet ], type: 'text' }});
                client.disconnect(true);
            }
        }
        else
        {
            client.emit(Eventos.handshake_sucess, { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
            server.enviarMensagemTo(client.id, Eventos.new_message, { from: "ADM", message: { content: "Senha não informada!", to: [ handshake.UsuarioIntranet ], type: 'text' }});
           setTimeout(()=>  client.disconnect(true), 5000);
        }       
    };
}


