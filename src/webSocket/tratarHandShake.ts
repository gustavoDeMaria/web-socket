import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { clienteIdentificacao } from "../cliente/clienteIdentificacao";
import { listaClientesConectados } from "./clientes";

export function tratarHandShake(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): (...args: any[]) => void {
    return (handshake: clienteIdentificacao) => {

        listaClientesConectados.push({ client, handshake })

        client.data = handshake;

        client.emit('handshake-sucess', { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null }); 
        
        console.log(client);
    };
}
