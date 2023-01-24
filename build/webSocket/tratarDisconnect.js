"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarDisconnect = void 0;
function tratarDisconnect(server, client) {
    server.removerClienteConectado(client);
    console.log("Disconectado: ", client.id);
}
exports.tratarDisconnect = tratarDisconnect;
//# sourceMappingURL=tratarDisconnect.js.map