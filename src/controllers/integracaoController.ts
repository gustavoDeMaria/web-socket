import CD from "../decorators/controllers/ControllerDecorators";
import DependecyService from "../dependencyInjection/DependecyService";
import { HTTPVerbs } from "../enums/httpVerbs/HttpVerbs";
import { IStoryAlterated } from "../models/pivotal";
import { SocketServer } from "../webSocket/SocketServer";
import { ControllerBase } from "./base/ControllerBase";
import { apontamentosGT as ApontamentosGT } from "../services/apontamentoGT";
import { usuarioIntranet as UsuarioIntranet } from "../services/usuarioIntranet";
import { CategoriasIntranet } from "../services/categoriasIntranet";
import { DateTime } from "./DateTime";
import { IPivotalStory } from "./Interface/IPivotalStory";
import { PivotalService } from "../services/pivotalService";


const apontamento = new ApontamentosGT();
const apontamentoDaIntranet = new UsuarioIntranet();
const categoriasIntranet = new CategoriasIntranet();
const pivotalService = new PivotalService();

@CD.Route("/integracao")
export class IntegracaoController extends ControllerBase {

    @CD.Action("/pivotal")
    @CD.Verb(HTTPVerbs.POST)
    public async webHook(): Promise<void> {
        try {

            const server = DependecyService.Resolve<SocketServer>(SocketServer);

            const story = this.Request.body as IStoryAlterated;

            //console.log("BODY: ", story);

            if (story) {

                await this.tratarAlteracaoStory(server, story);
            }

            this.OK("Gerado com sucesso!");
        }
        catch (err) {
            this.Error({ error: (err as Error).message });

        }
    }

    async tratarAlteracaoStory(server: SocketServer, story: IStoryAlterated) {

        if (story && story.changes
            .filter(modificacao => modificacao.original_values.current_state
                !== modificacao.new_values.current_state)) {
            story.changes.forEach(async modificacao => {
                if (modificacao.kind === 'story' && modificacao.new_values) {

                    const detalhesStory = this.ObterDadosPivotal(story);

                    if (detalhesStory) {
                        switch (modificacao.new_values.current_state) {
                            case "finished":
                                console.log(`APONTAR FINALIZAÇÃO DE TAREFA ${story.primary_resources.find(s => s.kind === "story")?.id} PARA ${story.performed_by.name} (${story.performed_by.initials})`);
                                //await this.apontarGT(server, detalhesStory);
                                break;

                            case "started":
                                console.log(`APONTAR INÍCIO DE TAREFA ${story.primary_resources.find(s => s.kind === "story")?.id} PARA ${story.performed_by.name} (${story.performed_by.initials})`);
                                await this.apontarGT(server, detalhesStory);
                                break;
                        }
                    }
                }
                else if (modificacao.kind === 'review' && modificacao.new_values) {

                    const detalhesStory = this.ObterDadosPivotal(story);

                    if (detalhesStory) {
                        switch (modificacao.new_values.status) {
                            case "finished":
                                console.log(`APONTAR FINALIZAÇÃO DE TAREFA ${story.primary_resources.find(s => s.kind === "story")?.id} PARA ${story.performed_by.name} (${story.performed_by.initials})`);
                                //await this.apontarGT(server, detalhesStory);
                                break;

                            case "in_review":
                                console.log(`APONTAR REVIEW DE TAREFA ${story.primary_resources.find(s => s.kind === "story")?.id} PARA ${story.performed_by.name} (${story.performed_by.initials})`);
                                await this.apontarGT(server, detalhesStory, true);
                                break;
                        }
                    }
                }
            });
        }
    }

    ObterDadosPivotal(story: IStoryAlterated): IPivotalStory | null {
        const detalhes = story.primary_resources.find(piv => piv.kind === 'story');
        const alteracaoes = story.changes.find(piv => piv.kind === 'story');

        if (detalhes && alteracaoes) {

            return {
                titulopivotal: detalhes.name,
                tipopivotal: detalhes.story_type,
                statuspivotalini: alteracaoes?.new_values.current_state ?? "",
                statuspivotalfim: "",
                pontospivotal: alteracaoes?.story_priority.substring(1, 1) ?? "",
                projetopivotal: story.project.id,
                storyId: detalhes.id.toString(),
                usuario: story.performed_by.initials
            };
        }
        else {
            return null;
        }
    }

    async apontarGT(server: SocketServer, pivotal: IPivotalStory, cq: boolean = false) {

        try {
            //obtem usuario
            const usuarioIntranet = await apontamentoDaIntranet.obterPorLoginPivotal(pivotal.usuario);
            if (usuarioIntranet && usuarioIntranet.depto_id) {
                //obtem categoria
                const categorias = cq? undefined 
                                        : await categoriasIntranet.obterPorProjetoPivotal(pivotal.projetopivotal,
                                                                                            usuarioIntranet.depto_id);

                if (categorias && categorias.length > 0) {

                    const categoriasFiltradas = cq ? categorias.find(cat => cat.nome?.indexOf("Teste") !== -1)
                        : categorias.find(cat => cat.nome?.indexOf("Teste") === -1);

                    if (usuarioIntranet && categoriasFiltradas) {

                        const login = usuarioIntranet.login ?? "";

                        // finaliza última tarefa
                        const ultima = await this.finalizarApontamentoGT(server, pivotal, usuarioIntranet.api_token);

                        if (!ultima || ultima.idpivotal?.replace("#", "") !== pivotal.storyId) {
                            //realiza apontamento
                            await apontamento.criar({
                                id: 0,
                                login: login,
                                atividade: categoriasFiltradas.id,
                                datahora: DateTime.Now(),
                                obs: null,
                                datahoraini: DateTime.Now(),
                                dificuldade: null,
                                titulopivotal: pivotal.titulopivotal,
                                tipopivotal: pivotal.tipopivotal,
                                statuspivotalini: pivotal.statuspivotalini,
                                statuspivotalfim: pivotal.statuspivotalfim,
                                pontospivotal: pivotal.pontospivotal,
                                depto_id: categorias[0].depto_id,
                                idpivotal: "#" + pivotal.storyId
                            });
                        }
                        //nofica socket
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }

    }

    async finalizarApontamentoGT(server: SocketServer, pivotal: IPivotalStory, api_token: string | null) {

        try {
            //obtem usuario
            const usuarioIntranet = await apontamentoDaIntranet.obterPorLoginPivotal(pivotal.usuario);

            if (usuarioIntranet && usuarioIntranet.login) {

                // finaliza última tarefa
                const ultima = await apontamento.obterUltimoApontamento(usuarioIntranet.login);

                if (ultima && ultima.idpivotal) {

                    if (ultima.idpivotal && ultima.atividade && ultima.depto_id) {

                        const categoria = await categoriasIntranet.obterPorID(ultima.atividade, ultima.depto_id);

                        if (categoria && categoria.projeto_idpivotal && api_token) {
                            const pivotalStatus = await pivotalService.ObterStory(categoria.projeto_idpivotal,
                                ultima.idpivotal, api_token);

                            if (pivotalStatus) {
                                ultima.statuspivotalfim = pivotalStatus.current_state;
                                await apontamento.atualizar(ultima);
                                return ultima;
                            }
                        }
                    }
                }
                //nofica socket
            }
        } catch (error) {
            console.error(error);
        }
    }
}