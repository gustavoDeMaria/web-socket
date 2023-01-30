
export class UsuariosOnline {
    public usuarios: IUsuarioOnline[] = [];
}

export interface IUsuarioOnline {
    UsuarioSAC: string;
    UsuarioIntranet: string;
    IdDiscord: string;
}
