"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarHandShake = void 0;
var Eventos_1 = require("./enum/Eventos");
function tratarHandShake(server, client) {
    return function (handshake) {
        server.adicionaClienteConectado(client, handshake);
        console.log("Conectado: ", client.id);
        client.emit(Eventos_1.Eventos.handshake_sucess, { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
    };
}
exports.tratarHandShake = tratarHandShake;
//# sourceMappingURL=tratarHandShake.js.map