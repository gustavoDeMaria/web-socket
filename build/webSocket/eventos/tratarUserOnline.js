"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterUsuarios = exports.tratarUserOnline = void 0;
var Eventos_1 = require("../enum/Eventos");
var UsuariosOnline_1 = require("../../models/UsuariosOnline");
function tratarUserOnline(server, client) {
    return function () {
        obterUsuarios(server, client);
    };
}
exports.tratarUserOnline = tratarUserOnline;
function obterUsuarios(server, client) {
    var clientes = new UsuariosOnline_1.UsuariosOnline();
    server.clientesConectados.forEach(function (user) { return clientes.usuarios.push(user.handshake); });
    server.enviarMensagem(Eventos_1.Eventos.user_online_response, clientes);
    console.log(server.clientesConectados);
}
exports.obterUsuarios = obterUsuarios;
//# sourceMappingURL=tratarUserOnline.js.map