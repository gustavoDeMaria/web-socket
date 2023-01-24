"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
var socket_io_1 = require("socket.io");
var tratarEventosWebSockets_1 = require("./tratarEventosWebSockets");
var SocketServer = /** @class */ (function () {
    function SocketServer(httpServer) {
        this.clientesConectados = [];
        this.socketServer = new socket_io_1.Server(httpServer, { /* options */});
        (0, tratarEventosWebSockets_1.tratarEventosWebSockets)(this);
    }
    SocketServer.prototype.adicionaClienteConectado = function (client, handshake) {
        this.clientesConectados.push({ client: client, handshake: handshake });
    };
    SocketServer.prototype.removerClienteConectado = function (client) {
        this.clientesConectados = this.clientesConectados.filter(function (identificacao) { return identificacao.client.id === client.id; });
    };
    SocketServer.prototype.enviarMensagem = function (clientId, evento, msg) {
        this.socketServer.to(clientId).emit(evento.toString(), msg);
    };
    SocketServer.prototype.obterSocketClient = function (iniciais) {
        var _a;
        return (_a = this.clientesConectados.find(function (sc) { var _a; return ((_a = sc.handshake) === null || _a === void 0 ? void 0 : _a.UsuarioIntranet) === iniciais; })) === null || _a === void 0 ? void 0 : _a.client;
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
//# sourceMappingURL=webSocketService.js.map