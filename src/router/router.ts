import { Router } from "express";
import { servidorWebSocket } from "../webSocket/webSocketService";

const router: Router = Router();

//rotas
router.get("/", (req,res)=> 
{
    servidorWebSocket.servidorooo?.emit("new-registration-requested", {Guide: "123", UltimoPivotal: "1234"});
    console.log(servidorWebSocket.servidorooo?.sockets.sockets.values)
    res.send(servidorWebSocket.servidorooo?.sockets.sockets.values);
});

export { router };