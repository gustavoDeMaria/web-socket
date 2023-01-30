"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarEventosWebSockets = void 0;
var Eventos_1 = require("../enum/Eventos");
var tratarDisconnect_1 = require("./tratarDisconnect");
var tratarHandShake_1 = require("./tratarHandShake");
var tratarNewMessage_1 = require("./tratarNewMessage");
var tratarUserOnline_1 = require("./tratarUserOnline");
function tratarEventosWebSockets(server) {
    server.socketServer.on(Eventos_1.Eventos.connection, function (client) {
        client.on(Eventos_1.Eventos.handshake, (0, tratarHandShake_1.tratarHandShake)(server, client));
        client.on(Eventos_1.Eventos.disconnect, (0, tratarDisconnect_1.tratarDisconnect)(server, client));
        client.on(Eventos_1.Eventos.new_message, (0, tratarNewMessage_1.tratarNewMessage)(server, client));
        client.on(Eventos_1.Eventos.user_online_request, (0, tratarUserOnline_1.tratarUserOnline)(server, client));
        client.on(Eventos_1.Eventos.message_received, tratarMessageReceived(server, client));
        client.join("windows");
    });
    server.socketServer.socketsJoin("windows");
}
exports.tratarEventosWebSockets = tratarEventosWebSockets;
function tratarMessageReceived(server, client) {
    return function () {
        var _a;
        var user = (_a = server.obterClient(client.id)) === null || _a === void 0 ? void 0 : _a.UsuarioIntranet;
        console.log("".concat(user, " recebeu a mensagem!"));
    };
}
//# sourceMappingURL=index.js.map