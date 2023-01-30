import { departamentos } from '@prisma/client';
import { Icrud } from './interface/Icrud';
import { prisma } from './apontamentoGT';


export class departamentosIntranet implements Icrud<departamentos>
{
    async criar(data: departamentos): Promise<departamentos> {
        return await prisma.departamentos.create({
            data: {
                ...data,
            }
        });
    }

    async atualizar(data: departamentos): Promise<departamentos> {
        return await prisma.departamentos.update({
            where: { id: data.id }, data: {
                ...data
            }
        });
    }

    async obterPorID(id: any): Promise<departamentos | null> {
        return await prisma.departamentos.findUnique({
            where: { id }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterTodos(): Promise<departamentos[]> {
        return await prisma.departamentos.findMany({
            // include: { permissoes_perfil: { include: { permissao: true } } },
        });
    }

    async excluirPorID(id: number): Promise<departamentos | null> {
        return await prisma.departamentos.delete({ where: { id: id } });
    }

}
