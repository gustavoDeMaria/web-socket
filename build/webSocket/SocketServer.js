"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
var socket_io_1 = require("socket.io");
var eventos_1 = require("./eventos");
var SocketServer = /** @class */ (function () {
    function SocketServer(httpServer) {
        this.clientesConectados = [];
        this.socketServer = new socket_io_1.Server(httpServer, { /* options */});
        (0, eventos_1.tratarEventosWebSockets)(this);
    }
    SocketServer.prototype.adicionaClienteConectado = function (client, handshake) {
        if (handshake && handshake.UsuarioIntranet)
            this.clientesConectados.push({ socket: client, handshake: handshake });
    };
    SocketServer.prototype.removerClienteConectado = function (client) {
        this.clientesConectados = this.clientesConectados.filter(function (identificacao) { return identificacao.socket.id !== client.id; });
    };
    SocketServer.prototype.enviarMensagemTo = function (clientId, evento, msg) {
        this.socketServer.to(clientId).emit(evento.toString(), msg);
    };
    SocketServer.prototype.enviarMensagem = function (evento, msg) {
        this.socketServer.emit(evento.toString(), msg);
    };
    SocketServer.prototype.enviarMensagemExceptTo = function (evento, msg) {
        var _this = this;
        var ids = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            ids[_i - 2] = arguments[_i];
        }
        this.clientesConectados.forEach(function (user) {
            if (ids.indexOf(user.socket.id) == -1) {
                _this.socketServer.to(user.socket.id).emit(evento.toString(), msg);
            }
        });
    };
    SocketServer.prototype.obterSocketClient = function (iniciais) {
        var _a;
        return (_a = this.clientesConectados.find(function (sc) { var _a; return ((_a = sc.handshake) === null || _a === void 0 ? void 0 : _a.UsuarioIntranet) === iniciais; })) === null || _a === void 0 ? void 0 : _a.socket;
    };
    SocketServer.prototype.obterUsuarioIntranet = function (iniciaisPivotal) {
        var _a;
        return (_a = this.clientesConectados.find(function (sc) { var _a; return ((_a = sc.handshake) === null || _a === void 0 ? void 0 : _a.UsuarioPivotal) === iniciaisPivotal; })) === null || _a === void 0 ? void 0 : _a.handshake.UsuarioIntranet;
    };
    SocketServer.prototype.obterClient = function (socketId) {
        var _a;
        return (_a = this.clientesConectados.find(function (sc) { return sc.socket.id === socketId; })) === null || _a === void 0 ? void 0 : _a.handshake;
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
//# sourceMappingURL=SocketServer.js.map