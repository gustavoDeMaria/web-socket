import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { usuarioIntranet } from "../../services/usuarioIntranet";
import { CategoriasIntranet } from "../../services/categoriasIntranet";
import { Eventos } from "../enum/Eventos";

const UsuarioIntranet = new usuarioIntranet();
const categorias = new CategoriasIntranet();

export function tratarCategoriaRequest(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return async () => {

        const usuarioSocket = server.obterClient(client.id)?.UsuarioIntranet;

        console.log("usuario", usuarioSocket)

        if(usuarioSocket){
            const usuarioIntranet = await UsuarioIntranet.obterPorLogin(usuarioSocket);

            console.log("usuario", usuarioIntranet)


            if (usuarioIntranet){
                const categoriaArray = await categorias.obterPorDepartamento(usuarioIntranet.depto_id);

                console.log("categoriaArray", categoriaArray)

                if (categoriaArray){
                    server.enviarMensagemTo(client.id, Eventos.categoria_response, categoriaArray);
                }
            }
        }
    };
}
