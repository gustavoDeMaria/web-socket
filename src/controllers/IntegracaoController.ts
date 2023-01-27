import CD from "../decorators/controllers/ControllerDecorators";
import DependecyService from "../dependencyInjection/DependecyService";
import { HTTPVerbs } from "../enums/httpVerbs/HttpVerbs";
import { INewValues, IStoryAlterated } from "../models/pivotal";
import { Eventos } from "../webSocket/enum/Eventos";
import { SocketServer } from "../webSocket/SocketServer";
import { ControllerBase } from "./base/ControllerBase";

@CD.Route("/integracao")
export class IntegracaoController extends ControllerBase {

    @CD.Action("/pivotal")
    @CD.Verb(HTTPVerbs.POST)
    public async webHook(): Promise<void> {
        try {

            const server = DependecyService.Resolve<SocketServer>(SocketServer);

            const story = this.Request.body as IStoryAlterated;

            if (story) {

                const novosValores = this.obtemNovosValoresSeAlterado(story);

                if (novosValores) {

                    const cliente = server.obterSocketClient(story.performed_by.initials);

                    if (cliente) {
                        server.enviarMensagemTo(cliente.id, Eventos.new_registration_requested, { Guide: cliente?.id, UltimoPivotal: story.primary_resources[0]?.id });
                    }
                }
            }

            this.OK("Gerado com sucesso!");
        }
        catch (err) {
            this.Error({ error: (err as Error).message });

        }
    }

    obtemNovosValoresSeAlterado(story: IStoryAlterated): INewValues | undefined {
        if (story && story.changes.filter(modificacao => modificacao.original_values.current_state !== modificacao.new_values.current_state)) {
            story.changes.forEach(modificacao => {
                if (modificacao.new_values.current_state === "delivered") {
    
                    return modificacao.new_values;
                }
            });
        }
    
        return undefined;
    }
}
