import { usuarioIntranet } from "../services/usuarioIntranet";
import * as crypto from 'crypto';

export class UsuarioController
{
    private usuarioService = new usuarioIntranet();

    constructor() {}
  
    async obterPorID(id: number) {
        return await this.usuarioService.obterPorID(id)
    }

    async obterTodos()  {
        return await this.usuarioService.obterTodos()
    }    
         
    private async ConsultarUsuarioLogin(login: string) {
        return await this.usuarioService.obterPorLoginPivotal(login)
    }

    private async ValidarSenha(login: string, senha: string)
    {
        const usuario =  await this.ConsultarUsuarioLogin(login);

        if (usuario) {
            if (usuario.senha){
                const senhaBdIntranetStr = Buffer.from(usuario.senha, 'base64').toString('binary');
                const senhaMd5 = crypto.createHash('md5').update(senhaBdIntranetStr).digest("hex");
                return senhaMd5 === senha;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}


