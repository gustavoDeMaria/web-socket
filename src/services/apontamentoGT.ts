import { logsusuarios, PrismaClient } from '@prisma/client'
import { Icrud } from './interface/Icrud';
export const prisma = new PrismaClient()


export class apontamentosGT implements Icrud<logsusuarios>
{
    async criar(data: logsusuarios): Promise<logsusuarios> {
       return await prisma.logsusuarios.create({
        data: {
            ...data,
        }});
    }
    
    async atualizar(data: logsusuarios): Promise<logsusuarios> {
        return await prisma.logsusuarios.update({
            where: { id: data.id }, data: {
                ...data
            }
        });
    }

    async obterPorID(id: any): Promise<logsusuarios | null> {
        return await prisma.logsusuarios.findUnique({
            where: { id }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterTodos(): Promise<logsusuarios[]> {
        return await prisma.logsusuarios.findMany({
           // include: { permissoes_perfil: { include: { permissao: true } } },
            orderBy: { datahora: "asc" }
        });
    }

    async excluirPorID(id: number): Promise<logsusuarios | null> {
        return await prisma.logsusuarios.delete({ where: { id } });
    }
    
}

