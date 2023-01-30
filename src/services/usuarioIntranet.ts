import { usuario } from '@prisma/client';
import { Icrud } from './interface/Icrud';
import { prisma } from './apontamentoGT';

export class usuarioIntranet implements Icrud<usuario>
{
    async criar(data: usuario): Promise<usuario> {
        return await prisma.usuario.create({
            data: {
                ...data,
            }
        });
    }

    async atualizar(data: usuario): Promise<usuario> {
        return await prisma.usuario.update({
            where: { oid: data.oid }, data: {
                ...data
            }
        });
    }

    async obterPorID(oid: number): Promise<usuario | null> {
        return await prisma.usuario.findUnique({
            where: { oid }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterPorLogin(login: string): Promise<usuario[] | null> {
        return await prisma.usuario.findMany({         
            where: { login }            
        });
    }

    async obterTodos(): Promise<usuario[]> {
        return await prisma.usuario.findMany({
             
        });
    }

    async excluirPorID(id: number): Promise<usuario | null> {
        return await prisma.usuario.delete({ where: { oid: id } });
    }

}
