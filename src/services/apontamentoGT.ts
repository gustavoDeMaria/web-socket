import { logsusuarios } from '@prisma/client';
import { prismaClient } from '../database/prismaPg';
import { Icrud } from './interface/Icrud';



export class apontamentosGT implements Icrud<logsusuarios>
{
    async criar(data: logsusuarios): Promise<logsusuarios> {

        const { id, ...object } = data;

        return await prismaClient.logsusuarios.create({
            data: {
                ...object,
            }
        });
    }

    async atualizar(data: logsusuarios): Promise<logsusuarios> {
        return await prismaClient.logsusuarios.update({
            where: { id: data.id }, data: {
                ...data
            }
        });
    }

    async obterPorID(id: any): Promise<logsusuarios | null> {
        return await prismaClient.logsusuarios.findUnique({
            where: { id }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterUltimaUsuario(login: string): Promise<logsusuarios | null> {
        return await prismaClient.logsusuarios.findFirst({
            where: { login },
            orderBy: { datahoraini: "desc" }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterPorPivotalId(idpivotal: string): Promise<logsusuarios | null> {
        return await prismaClient.logsusuarios.findFirst({
            where: {
                AND: [
                    { idpivotal }
                ]
            },
            orderBy: { datahoraini: "desc" }
            //, include: { permissoes_perfil: { include: { permissao: true } } }
        });
    }

    async obterUltimosApontamento() {
        let lastDay = Date.now() - (24 * 60 * 60 * 1000);
        let lastDayStr = new Date(lastDay).toISOString();

        return await prismaClient.logsusuarios.findMany({
            where: {
                datahoraini:
                {
                    gte: lastDayStr
                }
            },
            orderBy: { datahoraini: "desc" },
            take: 2
        });
    }

    
    async obterUltimoApontamento(login: string) {
        let lastDay = Date.now() - (24 * 60 * 60 * 1000);
        let lastDayStr = new Date(lastDay).toISOString();

        return await prismaClient.logsusuarios.findFirst({
            where: {
               AND: [
                { datahoraini:
                    {
                        gte: lastDayStr
                    }
                },
                { login }
               ]
            },
            orderBy: { datahoraini: "desc" },
            take: 2
        });
    }


    async obterTodos(): Promise<logsusuarios[]> {
        return await prismaClient.logsusuarios.findMany({
            // include: { permissoes_perfil: { include: { permissao: true } } },
            orderBy: { datahora: "asc" }
        });
    }

    async excluirPorID(id: number): Promise<logsusuarios | null> {
        return await prismaClient.logsusuarios.delete({ where: { id } });
    }

}

