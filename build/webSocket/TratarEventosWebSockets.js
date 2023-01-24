"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarEventosWebSockets = void 0;
var Eventos_1 = require("./enum/Eventos");
var tratarDisconnect_1 = require("./tratarDisconnect");
var tratarHandShake_1 = require("./tratarHandShake");
function tratarEventosWebSockets(server) {
    server.socketServer.on(Eventos_1.Eventos.connection, function (client) {
        client.on(Eventos_1.Eventos.handshake, (0, tratarHandShake_1.tratarHandShake)(server, client));
        client.on(Eventos_1.Eventos.disconnect, function () { return (0, tratarDisconnect_1.tratarDisconnect)(server, client); });
    });
}
exports.tratarEventosWebSockets = tratarEventosWebSockets;
//# sourceMappingURL=tratarEventosWebSockets.js.map