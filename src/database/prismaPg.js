import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
    errorFormat: "minimal",
    log: [
        {
          emit: 'stdout',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
});

//  prismaClient.$on("query", async (e) => {
//     console.log(`${e.query} ${e.params}`)
// });

export { prismaClient };