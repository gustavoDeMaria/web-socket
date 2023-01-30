import { departamentosIntranet } from "../services/departamentoIntranet";


export class DepartamentosController {
    private departamentoService = new departamentosIntranet();

    constructor() { }

    async obterPorID(id: number) {
        return await this.departamentoService.obterPorID(id);
    }

    async obterTodos() {
        return await this.departamentoService.obterTodos();
    }
}


