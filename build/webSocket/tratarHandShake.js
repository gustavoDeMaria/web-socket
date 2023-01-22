"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarHandShake = void 0;
var clientes_1 = require("./clientes");
function tratarHandShake(client) {
    return function (handshake) {
        clientes_1.listaClientesConectados.push({ client: client, handshake: handshake });
        client.data = handshake;
        client.emit('handshake-sucess', { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
        console.log(client);
    };
}
exports.tratarHandShake = tratarHandShake;
