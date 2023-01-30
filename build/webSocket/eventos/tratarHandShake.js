"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarHandShake = void 0;
var Eventos_1 = require("../enum/Eventos");
var tratarUserOnline_1 = require("./tratarUserOnline");
function tratarHandShake(server, client) {
    return function (handshake) {
        server.adicionaClienteConectado(client, handshake);
        setTimeout(function () {
            (0, tratarUserOnline_1.obterUsuarios)(server, client);
        }, 1000);
        console.log("Conectado: ", client.id, "usuário: ", handshake === null || handshake === void 0 ? void 0 : handshake.UsuarioIntranet);
        client.emit(Eventos_1.Eventos.handshake_sucess, { Guid: client.id, Sucess: true, Message: "Conectado com sucesso", Error: null });
        server.enviarMensagemExceptTo(Eventos_1.Eventos.status_changed, "".concat(handshake.UsuarioIntranet, " est\u00E1 online"), client.id);
    };
}
exports.tratarHandShake = tratarHandShake;
//# sourceMappingURL=tratarHandShake.js.map