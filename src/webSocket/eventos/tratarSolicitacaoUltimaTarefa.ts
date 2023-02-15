import { Eventos } from "../enum/Eventos";
import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { apontamentosGT } from "../../services/apontamentoGT";
import { CategoriasIntranet } from "../../services/categoriasIntranet";

const Apontamentos = new apontamentosGT();
const Categorias = new CategoriasIntranet();

export function tratarSolicitacaoUltimaTarefa(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return async (request) => {
        const from = server.obterClient(client.id)?.UsuarioIntranet;

        if (from) {

            const ultima = await Apontamentos.obterUltimaUsuario(from);
            const categoria = await Categorias.obterPorID(ultima?.atividade ?? -1, ultima?.depto_id ?? -1);

            if (ultima && categoria) {
                server.enviarMensagemTo(client.id, Eventos.solicita_tarefa_atual_response, { categoria: categoria.nome, inicio: ultima.datahoraini});
            }
        }
    };
}
