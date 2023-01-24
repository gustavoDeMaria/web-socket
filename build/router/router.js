"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var webSocketService_1 = require("../webSocket/webSocketService");
var router = (0, express_1.Router)();
exports.router = router;
//rotas
router.get("/integracao/pivotaltracker", function (req, res) {
    var socketServer = webSocketService_1.servidorWebSocket.socketServer;
    var story = req.body;
    if (story) {
        if (story.changes.filter(function (modificacao) { return modificacao.original_values.current_state !== modificacao.new_values.current_state; })) {
            story.changes.forEach(function (modificacao) {
                if (modificacao.new_values.current_state === "delivered") {
                    var cliente = Array.from(socketServer.sockets.sockets.values())
                        .find(function (sc) { var _a; return ((_a = sc.data) === null || _a === void 0 ? void 0 : _a.UsuarioIntranet) === story.u; });
                    socketServer.sockets.sockets.forEach(function (sc) {
                        console.log("cliente", sc.data);
                    });
                    console.log("cliente", cliente);
                    if (cliente) {
                        socketServer.to(cliente === null || cliente === void 0 ? void 0 : cliente.id).emit("new-registration-requested", { Guide: "123", UltimoPivotal: "1234" });
                    }
                }
            });
        }
    }
    res.end();
});
