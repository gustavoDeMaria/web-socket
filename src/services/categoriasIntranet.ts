import { categorias } from '@prisma/client';
import { prismaClient } from '../database/prismaPg';

export class CategoriasIntranet
{
    async criar(data: categorias): Promise<categorias> {
        return await prismaClient.categorias.create({
            data: {
                ...data,
            }
        });
    }

    async atualizar(data: categorias): Promise<categorias> {

        const id = data.id;
        const depto_id = data.depto_id;

        return await prismaClient.categorias.update({
            where: { id_depto_id: { id, depto_id }}, data: {
                ...data
            }
        });
    }

    async obterPorID(id: number, depto_id: number) {
      try {
        return await prismaClient.categorias.findUniqueOrThrow({
            where: { id_depto_id: { id, depto_id }},
            select: { departamentos: false, depto_id: true, projeto_idpivotal:true, nome: true }
                   
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    async obterPorDepartamento(depto_id: any): Promise<categorias[] | null> {
        return await prismaClient.categorias.findMany({
            where: { AND:[{depto_id}, {status: 'A'}] },
            orderBy: { nome: 'asc' }
        });
    }

    async obterPorDepartamentoResumido(depto_id: any): Promise<categorias[] | null> {
        return await prismaClient.categorias.findMany({
            where: { depto_id }
        });
    }

    async obterPorProjetoPivotal(projeto_idpivotal: number, depto_id: number): Promise<categorias[] | null> {
       try {
        return await prismaClient.categorias.findMany({
            where: { projeto_idpivotal, depto_id }
        });
       } catch (error) {
        console.error(error);
        return null;
       }
    }

    async obterTodos(): Promise<categorias[]> {
        return await prismaClient.categorias.findMany({
            // include: { permissoes_perfil: { include: { permissao: true } } },
        });
    }

    async excluirPorID(id: number, depto_id :number): Promise<categorias | null> {
        return await prismaClient.categorias.delete({  where: { id_depto_id: { id, depto_id }} });
    }

}
