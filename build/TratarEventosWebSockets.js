"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TratarEventosWebSockets = void 0;
function TratarEventosWebSockets(socket) {
    socket.on("connection", function (socket) {
        socket.on("handshake", function (handshake) {
            socket.emit('handshake-sucess', { Guid: socket.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
            setTimeout(function () {
                if (socket.connected) {
                    socket.emit('new-registration-requested', { Guid: socket.id, UltimoPivotal: "#123456798" });
                }
            }, 5000);
        });
    });
}
exports.TratarEventosWebSockets = TratarEventosWebSockets;
