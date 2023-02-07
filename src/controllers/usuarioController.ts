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

    public async ValidarSenha(login: string, senha: string)
    {
        
        console.log("ValidarSenha",login, senha)
        
        const usuario =  await this.ConsultarUsuarioLogin(login);

        console.log("usuario",usuario)

        if (usuario) {
            if (usuario.senha){
                console.log("usuario.senha",usuario.senha)
                const senhaBdIntranetStr = Buffer.from(usuario.senha, 'base64').toString('binary');
                console.log("senhaBdIntranetStr",senhaBdIntranetStr)
                const senhaMd5 = crypto.createHash('md5').update(senhaBdIntranetStr).digest("hex");
                
                console.log("senhaMd5",senhaMd5, senha)

                return senhaBdIntranetStr === senha;
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


