"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servidorWebSocket = exports.StaticSocketServer = void 0;
var socket_io_1 = require("socket.io");
var tratarEventosWebSockets_1 = require("./tratarEventosWebSockets");
var StaticSocketServer = /** @class */ (function () {
    function StaticSocketServer() {
    }
    StaticSocketServer.prototype.Start = function (httpServer) {
        this.socketServer = new socket_io_1.Server(httpServer, { /* options */});
        (0, tratarEventosWebSockets_1.tratarEventosWebSockets)();
    };
    return StaticSocketServer;
}());
exports.StaticSocketServer = StaticSocketServer;
exports.servidorWebSocket = new StaticSocketServer();
