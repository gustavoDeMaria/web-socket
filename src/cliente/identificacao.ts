import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { clienteIdentificacao } from "./clienteIdentificacao";

export interface identificacao {
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    handshake: clienteIdentificacao;
}
