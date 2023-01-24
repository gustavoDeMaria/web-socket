"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarEventosWebSockets = void 0;
var tratarHandShake_1 = require("./tratarHandShake");
var webSocketService_1 = require("./webSocketService");
function tratarEventosWebSockets() {
    var socket = webSocketService_1.servidorWebSocket.socketServer;
    socket.on("connection", function (client) {
        client.on("handshake", (0, tratarHandShake_1.tratarHandShake)(client));
    });
}
exports.tratarEventosWebSockets = tratarEventosWebSockets;
