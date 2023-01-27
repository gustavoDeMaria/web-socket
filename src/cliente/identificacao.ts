import { SocketIO } from "../webSocket/SocketIO";
import { clienteIdentificacao } from "./clienteIdentificacao";

export interface identificacao {
    socket: SocketIO;
    handshake: clienteIdentificacao;
}
