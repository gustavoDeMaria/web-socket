"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarHandShake = void 0;
function tratarHandShake(client) {
    return function (handshake) {
        client.data = handshake;
        client.emit('handshake-sucess', { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
    };
}
exports.tratarHandShake = tratarHandShake;
