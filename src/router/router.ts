import { Router } from "express";
import { servidorWebSocket } from "../webSocket/webSocketService";

const router: Router = Router();

//rotas
router.get("/integracao/pivotaltracker", (req, res) => {
    const socketServer = servidorWebSocket.socketServer;

    const story = req.body as PivotalTracker.StoryAlterated;

    if (story) {
        if (story.changes.filter(modificacao => modificacao.original_values.current_state !== modificacao.new_values.current_state)) {
            story.changes.forEach(modificacao => {
                if (modificacao.new_values.current_state === "delivered") {
                    
                    const cliente = Array.from(socketServer.sockets.sockets.values())
                        .find(sc => sc.data?.UsuarioIntranet === story.u);

                    socketServer.sockets.sockets.forEach(sc => {
                        console.log("cliente", sc.data);

                    });

                    console.log("cliente", cliente);

                    if (cliente) {
                        socketServer.to(cliente?.id).emit("new-registration-requested", { Guide: "123", UltimoPivotal: "1234" });
                    }
                }
            });
        }
    }

    res.end();
});

export { router };