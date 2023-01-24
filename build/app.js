"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var router_1 = require("./router/router");
var webSocketService_1 = require("./webSocket/webSocketService");
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.middleware();
        this.router();
        webSocketService_1.servidorWebSocket.Start(this.httpServer);
    }
    App.prototype.middleware = function () {
        this.app.use(express_1.default.json());
    };
    App.prototype.router = function () {
        this.app.use(router_1.router);
    };
    return App;
}());
exports.App = App;
