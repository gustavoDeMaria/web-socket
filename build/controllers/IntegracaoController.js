"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegracaoController = void 0;
var ControllerDecorators_1 = __importDefault(require("../decorators/controllers/ControllerDecorators"));
var DependecyService_1 = __importDefault(require("../dependencyInjection/DependecyService"));
var HttpVerbs_1 = require("../enums/httpVerbs/HttpVerbs");
var SocketServer_1 = require("../webSocket/SocketServer");
var ControllerBase_1 = require("./base/ControllerBase");
var apontamentoGT_1 = require("../services/apontamentoGT");
var usuarioIntranet_1 = require("../services/usuarioIntranet");
var categoriasIntranet_1 = require("../services/categoriasIntranet");
var DateTime_1 = require("./DateTime");
var pivotalService_1 = require("../services/pivotalService");
var apontamento = new apontamentoGT_1.apontamentosGT();
var apontamentoDaIntranet = new usuarioIntranet_1.usuarioIntranet();
var categoriasIntranet = new categoriasIntranet_1.CategoriasIntranet();
var pivotalService = new pivotalService_1.PivotalService();
var IntegracaoController = /** @class */ (function (_super) {
    __extends(IntegracaoController, _super);
    function IntegracaoController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegracaoController.prototype.webHook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var server, story, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        server = DependecyService_1.default.Resolve(SocketServer_1.SocketServer);
                        story = this.Request.body;
                        if (!story) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tratarAlteracaoStory(server, story)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.OK("Gerado com sucesso!");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.Error({ error: err_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IntegracaoController.prototype.tratarAlteracaoStory = function (server, story) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (story && story.changes
                    .filter(function (modificacao) { return modificacao.original_values.current_state
                    !== modificacao.new_values.current_state; })) {
                    story.changes.forEach(function (modificacao) { return __awaiter(_this, void 0, void 0, function () {
                        var detalhesStory, _a;
                        var _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (!modificacao.new_values) return [3 /*break*/, 4];
                                    detalhesStory = this.ObterDadosPivotal(story);
                                    if (!detalhesStory) return [3 /*break*/, 4];
                                    _a = modificacao.new_values.current_state;
                                    switch (_a) {
                                        case "finished": return [3 /*break*/, 1];
                                        case "started": return [3 /*break*/, 2];
                                    }
                                    return [3 /*break*/, 4];
                                case 1:
                                    console.log("APONTAR FINALIZA\u00C7\u00C3O DE TAREFA ".concat((_b = story.primary_resources.find(function (s) { return s.kind === "story"; })) === null || _b === void 0 ? void 0 : _b.id, " PARA ").concat(story.performed_by.name, " (").concat(story.performed_by.initials, ")"));
                                    //await this.apontarGT(server, detalhesStory);
                                    return [3 /*break*/, 4];
                                case 2:
                                    console.log("APONTAR IN\u00CDCIO DE TAREFA ".concat((_c = story.primary_resources.find(function (s) { return s.kind === "story"; })) === null || _c === void 0 ? void 0 : _c.id, " PARA ").concat(story.performed_by.name, " (").concat(story.performed_by.initials, ")"));
                                    return [4 /*yield*/, this.apontarGT(server, detalhesStory)];
                                case 3:
                                    _d.sent();
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    IntegracaoController.prototype.ObterDadosPivotal = function (story) {
        var _a, _b;
        var detalhes = story.primary_resources.find(function (piv) { return piv.kind === 'story'; });
        var alteracaoes = story.changes.find(function (piv) { return piv.kind === 'story'; });
        if (detalhes && alteracaoes) {
            return {
                titulopivotal: detalhes.name,
                tipopivotal: detalhes.story_type,
                statuspivotalini: (_a = alteracaoes === null || alteracaoes === void 0 ? void 0 : alteracaoes.new_values.current_state) !== null && _a !== void 0 ? _a : "",
                statuspivotalfim: "",
                pontospivotal: (_b = alteracaoes === null || alteracaoes === void 0 ? void 0 : alteracaoes.story_priority.substring(1, 1)) !== null && _b !== void 0 ? _b : "",
                projetopivotal: story.project.id,
                storyId: detalhes.id.toString(),
                usuario: story.performed_by.initials
            };
        }
        else {
            return null;
        }
    };
    IntegracaoController.prototype.apontarGT = function (server, pivotal) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var usuarioIntranet, categorias, login, ultima, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, apontamentoDaIntranet.obterPorLogin(pivotal.usuario)];
                    case 1:
                        usuarioIntranet = _c.sent();
                        return [4 /*yield*/, categoriasIntranet.obterPorProjetoPivotal(pivotal.projetopivotal)];
                    case 2:
                        categorias = _c.sent();
                        if (!(usuarioIntranet && categorias && categorias.length > 0)) return [3 /*break*/, 5];
                        login = (_a = usuarioIntranet.login) !== null && _a !== void 0 ? _a : "";
                        return [4 /*yield*/, this.finalizarApontamentoGT(server, pivotal, usuarioIntranet.api_token)];
                    case 3:
                        ultima = _c.sent();
                        if (!(!ultima || ((_b = ultima.idpivotal) === null || _b === void 0 ? void 0 : _b.replace("#", "")) !== pivotal.storyId)) return [3 /*break*/, 5];
                        //realiza apontamento
                        return [4 /*yield*/, apontamento.criar({
                                id: 0,
                                login: login,
                                atividade: categorias[0].id,
                                datahora: DateTime_1.DateTime.Now(),
                                obs: null,
                                datahoraini: DateTime_1.DateTime.Now(),
                                dificuldade: null,
                                titulopivotal: pivotal.titulopivotal,
                                tipopivotal: pivotal.tipopivotal,
                                statuspivotalini: pivotal.statuspivotalini,
                                statuspivotalfim: pivotal.statuspivotalfim,
                                pontospivotal: pivotal.pontospivotal,
                                depto_id: categorias[0].depto_id,
                                idpivotal: "#" + pivotal.storyId
                            })];
                    case 4:
                        //realiza apontamento
                        _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        console.error(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    IntegracaoController.prototype.finalizarApontamentoGT = function (server, pivotal, api_token) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioIntranet, ultima, categoria, pivotalStatus, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, apontamentoDaIntranet.obterPorLogin(pivotal.usuario)];
                    case 1:
                        usuarioIntranet = _a.sent();
                        if (!(usuarioIntranet && usuarioIntranet.login)) return [3 /*break*/, 6];
                        return [4 /*yield*/, apontamento.obterUltimoApontamento(usuarioIntranet.login)];
                    case 2:
                        ultima = _a.sent();
                        if (!(ultima && ultima.idpivotal)) return [3 /*break*/, 6];
                        if (!(ultima.idpivotal && ultima.atividade && ultima.depto_id)) return [3 /*break*/, 6];
                        return [4 /*yield*/, categoriasIntranet.obterPorID(ultima.atividade, ultima.depto_id)];
                    case 3:
                        categoria = _a.sent();
                        if (!(categoria && categoria.projeto_idpivotal && api_token)) return [3 /*break*/, 6];
                        return [4 /*yield*/, pivotalService.ObterStory(categoria.projeto_idpivotal, ultima.idpivotal, api_token)];
                    case 4:
                        pivotalStatus = _a.sent();
                        if (!pivotalStatus) return [3 /*break*/, 6];
                        ultima.statuspivotalfim = pivotalStatus.current_state;
                        return [4 /*yield*/, apontamento.atualizar(ultima)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, ultima];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ControllerDecorators_1.default.Action("/pivotal"),
        ControllerDecorators_1.default.Verb(HttpVerbs_1.HTTPVerbs.POST)
    ], IntegracaoController.prototype, "webHook", null);
    IntegracaoController = __decorate([
        ControllerDecorators_1.default.Route("/integracao")
    ], IntegracaoController);
    return IntegracaoController;
}(ControllerBase_1.ControllerBase));
exports.IntegracaoController = IntegracaoController;
//# sourceMappingURL=integracaoController.js.map