import { SocketServer } from "../SocketServer";
import { SocketIO } from "../SocketIO";
import { usuarioIntranet } from "../../services/usuarioIntranet";
import { CategoriasIntranet } from "../../services/categoriasIntranet";
import { Eventos } from "../enum/Eventos";

const UsuarioIntranet = new usuarioIntranet();
const categorias = new CategoriasIntranet();

export function tratarCategoriaRequest(server: SocketServer, client: SocketIO): (...args: any[]) => void {
    return async () => {

        console.log("entrou")
        const user = server.obterClient(client.id)?.UsuarioIntranet;
        console.log("user", user)
        

        if(user){
            const usuario = await UsuarioIntranet.obterPorLogin(user);

            console.log("usuario", usuario)


            if (usuario){
                const categoriaArray = await categorias.obterPorDepartamento(usuario.depto_id);

                console.log("categoriaArray", categoriaArray)

                if (categoriaArray){
                    server.enviarMensagemTo(client.id, Eventos.categoria_response, categoriaArray);
                }
            }
        }
    };
}
