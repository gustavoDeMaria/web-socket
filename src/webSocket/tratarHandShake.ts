import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { clienteIdentificacao } from "../cliente/clienteIdentificacao";

export function tratarHandShake(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): (...args: any[]) => void {
    return (handshake: clienteIdentificacao) => {

        client.data = handshake;

        client.emit('handshake-sucess', { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null }); 
        
    };
}


