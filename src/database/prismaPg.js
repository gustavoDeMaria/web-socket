import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
    errorFormat: "minimal",
    
});

//  prismaClient.$on("query", async (e) => {
//     console.log(`${e.query} ${e.params}`)
// });

export { prismaClient };