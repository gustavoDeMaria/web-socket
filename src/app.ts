import "dotenv/config";
import express, { Express } from "express";
import IApplication from "./interfaces/IApplication";
import { StatusController } from "./controllers/statusController";
import { ControllerBase } from "./controllers/base/ControllerBase";
import { Server, createServer } from "http";
import DependecyService from "./dependencyInjection/DependecyService";
import { IntegracaoController } from "./controllers/integracaoController";
import { SocketServer } from "./webSocket/SocketServer";
import path from "path";

export default class Application implements IApplication {

    public Express: Express;

    public httpServer: Server;

    constructor() {

        process.env.dirname = __dirname;

        this.Express = express();

        this.httpServer = createServer(this.Express);

        this.Express.use("/update", express.static(path.resolve(__dirname, "update")));
    }

    public async StartAsync(): Promise<void> {
        this.Configure();
        
        this.httpServer.listen(process.env.PORT || 3334, () => {
            console.log(`App running on ${process.env.PORT || 3334}`);
        });
    }

    public Configure(): void {

        this.Express.use(express.json({ limit: 50 * 1024 * 1024 }));

        var singleton = new SocketServer(this.httpServer);
        DependecyService.Register(SocketServer, () => singleton);

        DependecyService.Register(IntegracaoController);
        DependecyService.Register(StatusController);

        ControllerBase.AppendController(IntegracaoController, this);
        ControllerBase.AppendController(StatusController, this);
    }
}