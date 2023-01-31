import { departamentos } from '@prisma/client';
import { prismaClient } from '../database/prismaPg';
import { Icrud } from './interface/Icrud';


export class departamentosIntranet implements Icrud<departamentos>
{
    async criar(data: departamentos): Promise<departamentos> {
        return await prismaClient.departamentos.create({
            data: {
                ...data,
            }
        });
    }

    async atualizar(data: departamentos): Promise<departamentos> {
        return await prismaClient.departamentos.update({
            where: { id: data.id }, data: {
                ...data
            }
        });
    }

    async obterPorID(id: any): Promise<departamentos | null> {
        return await prismaClient.departamentos.findUnique({
            where: { id }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterTodos(): Promise<departamentos[]> {
        return await prismaClient.departamentos.findMany({
            // include: { permissoes_perfil: { include: { permissao: true } } },
        });
    }

    async excluirPorID(id: number): Promise<departamentos | null> {
        return await prismaClient.departamentos.delete({ where: { id: id } });
    }

}
