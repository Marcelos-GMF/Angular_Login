export class UsuarioVO {

    public static readonly TIPO_USUARIO: number = 1;

    chave: string;
    nome: string;
    senha: string;
    email: string;
    tipoUsuario: number = UsuarioVO.TIPO_USUARIO;
    idUsuario: number;
    idUsuarioMenu: string;

}