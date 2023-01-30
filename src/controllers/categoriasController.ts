import { categoriasIntranet } from "../services/categoriasIntranet";


export class CategoriasController {
    private categoriasService = new categoriasIntranet();

    constructor() { }

    async obterPorID(id: number, departamentoId: number) {
        return await this.categoriasService.obterPorID(id, departamentoId);
    }

    async obterPorDepartamento(departamentoId: number) {
        return await this.categoriasService.obterPorDepartamento(departamentoId);
    }

    async obterTodos() {
        return await this.categoriasService.obterTodos();
    }
}
