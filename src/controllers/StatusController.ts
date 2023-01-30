import CD from "../decorators/controllers/ControllerDecorators";
import DependecyService from "../dependencyInjection/DependecyService";
import { HTTPVerbs } from "../enums/httpVerbs/HttpVerbs";
import { Eventos } from "../webSocket/enum/Eventos";
import { SocketServer } from "../webSocket/SocketServer";
import { ControllerBase } from "./base/ControllerBase";


@CD.Route("/status")
//@CD.Use(s => { console.log('teste 01'); })
export class StatusController extends ControllerBase {

    constructor() {
        super();
    }

    //@CD.Before(s => { console.log('teste 02'); })
    @CD.Verb(HTTPVerbs.GET)
    @CD.Action("/check")
    public CheckStatus(): void {
        const server = DependecyService.Resolve<SocketServer>(SocketServer);
            
        server.socketServer.to("windows").emit(Eventos.new_message, { from: "ADM", message: { to: null, content: "Mensagem pra sala windows!!!", type: "text", from: "ADM" } })
        
        this.OK({ status: "OK", date: new Date() });
    }

}
