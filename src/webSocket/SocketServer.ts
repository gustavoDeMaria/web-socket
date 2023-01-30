import { Server as SocketServerIO } from "socket.io";
import { Server } from "http";
import { tratarEventosWebSockets } from "./eventos";
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
        if (handshake && handshake.UsuarioIntranet)
        this.clientesConectados.push({ socket: client, handshake });
    }

    public removerClienteConectado(client: SocketIO) {
        this.clientesConectados = this.clientesConectados.filter(identificacao => identificacao.socket.id !== client.id);
    }

    public enviarMensagemTo<T>(clientId: string, evento: Eventos, msg: T): void {
        this.socketServer.to(clientId).emit(evento.toString(), msg);
    }

    public enviarMensagem<T>(evento: Eventos, msg: T): void {
        this.socketServer.emit(evento.toString(), msg);        
    }

    public enviarMensagemExceptTo<T>(evento: Eventos, msg: T, ...ids: string[]): void {
        this.clientesConectados.forEach(user =>
            {
                if (ids.indexOf(user.socket.id) == -1)
                {
                    this.socketServer.to(user.socket.id).emit(evento.toString(), msg);
                }
            });
    }

    public obterSocketClient(iniciais: string) : SocketIO | undefined {
        return this.clientesConectados.find(sc => sc.handshake?.UsuarioIntranet === iniciais)?.socket;
     } 

     public obterClient(socketId: string) : clienteIdentificacao | undefined {
        return this.clientesConectados.find(sc => sc.socket.id === socketId)?.handshake;
     } 
}


