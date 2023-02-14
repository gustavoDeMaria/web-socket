import { Eventos } from "../enum/Eventos";
import { tratarDisconnect } from "./tratarDisconnect";
import { tratarHandShake } from "./tratarHandShake";
import { tratarNewMessage } from "./tratarNewMessage";
import { SocketServer } from "../SocketServer";
import { tratarUserOnline } from "./tratarUserOnline";
import { tratarMessageReceived } from "./tratarMessageReceived";
import { tratarCategoriaRequest } from "./tratarCategoriaRequest";
import { apontarGT } from "./apontarGT";
import { tratarSolicitacaoUltimaTarefa } from "./tratarSolicitacaoUltimaTarefa";

import { tratarSolicitacaoVersaoAtual } from "./tratarSolicitacaoVersaoAtual";

export function tratarEventosWebSockets(server: SocketServer) {
    server.socketServer.on(Eventos.connection, (client) => {
        client.on(Eventos.handshake, tratarHandShake(server, client));
        client.on(Eventos.disconnect, tratarDisconnect(server, client));
        client.on(Eventos.new_message, tratarNewMessage(server, client));
        client.on(Eventos.user_online_request, tratarUserOnline(server, client));
        client.on(Eventos.message_received, tratarMessageReceived(server, client));
        client.on(Eventos.categoria_request, tratarCategoriaRequest(server, client));
        client.on(Eventos.apontamento_request, apontarGT(server, client));
        client.on(Eventos.solicita_tarefa_atual_request, tratarSolicitacaoUltimaTarefa(server, client));
        client.on(Eventos.solicitacao_versao_atual_request, tratarSolicitacaoVersaoAtual(server, client));
    });
}


