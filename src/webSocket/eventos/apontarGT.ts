import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { apontamentosGT } from "../../services/apontamentoGT";
import { usuarioIntranet } from "../../services/usuarioIntranet";
import { DateTime } from "../../controllers/DateTime";
import { Eventos } from "../enum/Eventos";

const apontamento = new apontamentosGT();
const UsuarioIntranet = new usuarioIntranet();

export interface IApontamentoRequest {
    CategoriaId: number,
    Observacoes: string,
    Id: string;
}

export function apontarGT(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return async (request: IApontamentoRequest) => {

        const usuarioSocket = server.obterClient(client.id)?.UsuarioIntranet;
        if (usuarioSocket && request) {
            const usuarioIntranet = await UsuarioIntranet.obterPorLogin(usuarioSocket);

            if (usuarioIntranet) {
                const criado = await apontamento.criar({
                    id: 0,
                    login: usuarioIntranet.login,
                    atividade: request.CategoriaId,
                    datahora: DateTime.Now(),
                    obs: request.Observacoes,
                    datahoraini: DateTime.Now(),
                    dificuldade: null,
                    titulopivotal: null,
                    tipopivotal: null,
                    statuspivotalini: null,
                    statuspivotalfim: null,
                    pontospivotal: null,
                    depto_id: usuarioIntranet.depto_id,
                    idpivotal: null
                });

                if (criado) {
                    server.enviarMensagemTo(client.id, Eventos.apontamento_sucesso, request.Id);
                }
            }
        }
    };
}
