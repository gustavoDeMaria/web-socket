import { usuario } from '@prisma/client';
import { prismaClient } from '../database/prismaPg';
import { Icrud } from './interface/Icrud';

export class usuarioIntranet implements Icrud<usuario>
{
    async criar(data: usuario): Promise<usuario> {
        return await prismaClient.usuario.create({
            data: {
                ...data,
            }
        });
    }

    async atualizar(data: usuario): Promise<usuario> {
        return await prismaClient.usuario.update({
            where: { oid: data.oid }, data: {
                ...data
            }
        });
    }

    async obterPorID(oid: number): Promise<usuario | null> {
        return await prismaClient.usuario.findUnique({
            where: { oid }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterPorLogin(login: string) {
        return await prismaClient.usuario.findFirst({
            where: {
                sigla_pivotal: login
            }
        });
    }

    async obterTodos(): Promise<usuario[]> {
        return await prismaClient.usuario.findMany({

        });
    }

    async excluirPorID(id: number): Promise<usuario | null> {
        return await prismaClient.usuario.delete({ where: { oid: id } });
    }
}
