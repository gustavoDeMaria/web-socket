"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarDisconnect = void 0;
var Eventos_1 = require("../enum/Eventos");
function tratarDisconnect(server, client) {
    return function (event) {
        var _a;
        var user = (_a = server.obterClient(client.id)) === null || _a === void 0 ? void 0 : _a.UsuarioIntranet;
        server.removerClienteConectado(client);
        if (user) {
            server.enviarMensagemExceptTo(Eventos_1.Eventos.status_changed, "".concat(user, " desconectou-se!"), client.id);
        }
        console.log("Disconectado: ", client.id);
    };
}
exports.tratarDisconnect = tratarDisconnect;
//# sourceMappingURL=tratarDisconnect.js.map