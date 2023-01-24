import { Server as SocketServerIO } from "socket.io";
import { Server } from "http";
import { tratarEventosWebSockets } from "./tratarEventosWebSockets";
import { identificacao } from "../cliente/identificacao";
import { clienteIdentificacao } from "../cliente/clienteIdentificacao";
import { SocketIO } from "./SocketIO";
import { Eventos } from "./enum/Eventos";

export class SocketServer {

    public socketServer: SocketServerIO;
    public clientesConectados: identificacao[] = [];

    public constructor(httpServer: Server) {
        this.socketServer = new SocketServerIO(httpServer, { /* options */ });
        tratarEventosWebSockets(this);
    }

    public adicionaClienteConectado(client: SocketIO, handshake: clienteIdentificacao) {
        this.clientesConectados.push({ client, handshake });
    }

    public removerClienteConectado(client: SocketIO) {
        this.clientesConectados = this.clientesConectados.filter(identificacao => identificacao.client.id === client.id);
    }

    public enviarMensagem<T>(clientId: string, evento: Eventos, msg: T): void {
        this.socketServer.to(clientId).emit(evento.toString(), msg);
    }

    public obterSocketClient(iniciais: string) : SocketIO | undefined {
        return this.clientesConectados.find(sc => sc.handshake?.UsuarioIntranet === iniciais)?.client;
     } 
}


