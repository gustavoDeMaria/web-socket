"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarEventosWebSockets = void 0;
var tratarHandShake_1 = require("./tratarHandShake");
function tratarEventosWebSockets(socket) {
    socket.on("connection", function (client) {
        client.on("handshake", (0, tratarHandShake_1.tratarHandShake)(client));
    });
}
exports.tratarEventosWebSockets = tratarEventosWebSockets;
