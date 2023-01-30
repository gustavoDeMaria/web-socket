
export interface Icrud<T> {
    criar(data: T): Promise<T>;
    atualizar(data: T): Promise<T>;
    obterPorID(...id: any[]): Promise<T | null>;
    obterTodos(): Promise<T[]>;
    excluirPorID(...id: string[] | number[]): Promise<T | null>;
}
