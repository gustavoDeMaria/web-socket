import CD from "../decorators/controllers/ControllerDecorators";
import { HTTPVerbs } from "../enums/httpVerbs/HttpVerbs";
import { ControllerBase } from "./base/ControllerBase";


@CD.Route("/status")
@CD.Use(s => { console.log('teste 01'); })
export class StatusController extends ControllerBase {

    constructor() {
        super();
    }

    @CD.Before(s => { console.log('teste 02'); })
    @CD.Verb(HTTPVerbs.GET)
    @CD.Action("/check")
    public CheckStatus(): void {
        this.OK({ status: "OK", date: new Date() });
    }

}
