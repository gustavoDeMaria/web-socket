import { Eventos } from "../enum/Eventos";
import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { solicitacao_versao_atual_response } from "./solicitacao_versao_atual_response";
import fs from 'fs';
import path from "path";


export function tratarSolicitacaoVersaoAtual(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return (request) => {

        try {
            console.log(process.env.BASE__dirname);
        
            const read = fs.readFileSync(path.resolve(process.env.BASE__dirname as string, 'update', 'info.json'), 'utf-8');

            const informacoes = JSON.parse(read) as unknown as solicitacao_versao_atual_response;
            informacoes.URLDownload = process.env.URL + '/update/package.zip';
            
        console.log(informacoes as unknown as solicitacao_versao_atual_response);
        
        server.enviarMensagemTo(client.id, Eventos.solicitacao_versao_atual_response, informacoes) ;
    
        } 
        catch (error) {
            console.log(error);
        }
    }
}
