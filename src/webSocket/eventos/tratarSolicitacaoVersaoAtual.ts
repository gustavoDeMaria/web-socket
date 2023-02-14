import { Eventos } from "../enum/Eventos";
import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { solicitacao_versao_atual_response } from "./solicitacao_versao_atual_response";
import fs from 'fs';

export function tratarSolicitacaoVersaoAtual(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return (request) => {

        try {
            console.log("chegou...");

            const informacoes = fs.readFileSync('../../update/info.json') as unknown as solicitacao_versao_atual_response;
            informacoes.URLDownload = process.env.URL + '/update/package.zip';
            server.enviarMensagem(Eventos.solicitacao_versao_atual_response, informacoes);
    
        } catch (error) {
            console.log(error);
        }
    }
}
