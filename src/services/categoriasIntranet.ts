import { categorias } from '@prisma/client';
import { Icrud } from './interface/Icrud';
import { prisma } from './apontamentoGT';


export class categoriasIntranet implements Icrud<categorias>
{
    async criar(data: categorias): Promise<categorias> {
        return await prisma.categorias.create({
            data: {
                ...data,
            }
        });
    }

    async atualizar(data: categorias): Promise<categorias> {

        const id = data.id;
        const depto_id = data.depto_id;

        return await prisma.categorias.update({
            where: { id_depto_id: { id, depto_id }}, data: {
                ...data
            }
        });
    }

    async obterPorID(id: any, depto_id: any): Promise<categorias | null> {
        return await prisma.categorias.findUnique({
            where: { id_depto_id: { id, depto_id }}
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterPorDepartamento(depto_id: any): Promise<categorias[] | null> {
        return await prisma.categorias.findMany({
            where: { depto_id }
        });
    }
    async obterTodos(): Promise<categorias[]> {
        return await prisma.categorias.findMany({
            // include: { permissoes_perfil: { include: { permissao: true } } },
        });
    }

    async excluirPorID(id: number, depto_id :number): Promise<categorias | null> {
        return await prisma.categorias.delete({  where: { id_depto_id: { id, depto_id }} });
    }

}
