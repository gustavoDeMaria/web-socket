"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var webSocketService_1 = require("../webSocket/webSocketService");
var router = (0, express_1.Router)();
exports.router = router;
//rotas
router.get("/", function (req, res) {
    var _a, _b, _c;
    (_a = webSocketService_1.servidorWebSocket.servidorooo) === null || _a === void 0 ? void 0 : _a.emit("new-registration-requested", { Guide: "123", UltimoPivotal: "1234" });
    console.log((_b = webSocketService_1.servidorWebSocket.servidorooo) === null || _b === void 0 ? void 0 : _b.sockets.sockets.values);
    res.send((_c = webSocketService_1.servidorWebSocket.servidorooo) === null || _c === void 0 ? void 0 : _c.sockets.sockets.values);
});
