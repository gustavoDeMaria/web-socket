
export interface IControllerCrud {
    criar(): void;
    atualizar(): void;
    obterPorID():void;
    obterTodos(): void;
    excluirPorID(): void;
}
