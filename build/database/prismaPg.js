"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
var client_1 = require("@prisma/client");
var prismaClient = new client_1.PrismaClient({
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
exports.prismaClient = prismaClient;
//# sourceMappingURL=prismaPg.js.map