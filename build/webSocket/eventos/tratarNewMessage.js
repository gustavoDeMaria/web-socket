"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarNewMessage = void 0;
var Eventos_1 = require("../enum/Eventos");
function tratarNewMessage(server, client) {
    return function (message) {
        var _a, _b;
        console.log(message);
        if (message) {
            var from_1 = (_a = server.obterClient(client.id)) === null || _a === void 0 ? void 0 : _a.UsuarioIntranet;
            if (from_1) {
                message.from = from_1;
                if (((_b = message.to) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    for (var _i = 0, _c = message.to; _i < _c.length; _i++) {
                        var user = _c[_i];
                        var to = server.obterSocketClient(user);
                        if (to) {
                            server.enviarMensagemTo(to.id, Eventos_1.Eventos.new_message, { from: from_1, message: message });
                        }
                    }
                    ;
                }
                else {
                    server.clientesConectados.forEach(function (user) {
                        console.log(client.id, user.socket.id);
                        if (client.id !== user.socket.id) {
                            server.enviarMensagemTo(user === null || user === void 0 ? void 0 : user.socket.id, Eventos_1.Eventos.new_message, { from: from_1, message: message });
                        }
                    });
                }
            }
        }
    };
}
exports.tratarNewMessage = tratarNewMessage;
//# sourceMappingURL=tratarNewMessage.js.map