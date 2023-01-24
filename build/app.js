"use strict";
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
var express_1 = __importDefault(require("express"));
var StatusController_1 = require("./controllers/StatusController");
var ControllerBase_1 = require("./controllers/base/ControllerBase");
var http_1 = require("http");
var DependecyService_1 = __importDefault(require("./dependencyInjection/DependecyService"));
var IntegracaoController_1 = require("./controllers/IntegracaoController");
var webSocketService_1 = require("./webSocket/webSocketService");
var Application = /** @class */ (function () {
    function Application() {
        process.env.dirname = __dirname;
        this.Express = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.Express);
    }
    Application.prototype.StartAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Configure();
                this.httpServer.listen(3333, function () {
                    console.log("App running on ".concat(3333));
                });
                return [2 /*return*/];
            });
        });
    };
    Application.prototype.Configure = function () {
        this.Express.use(express_1.default.json({ limit: 50 * 1024 * 1024 }));
        var singleton = new webSocketService_1.SocketServer(this.httpServer);
        DependecyService_1.default.Register(webSocketService_1.SocketServer, function () { return singleton; });
        DependecyService_1.default.Register(IntegracaoController_1.IntegracaoController);
        DependecyService_1.default.Register(StatusController_1.StatusController);
        ControllerBase_1.ControllerBase.AppendController(IntegracaoController_1.IntegracaoController, this);
        ControllerBase_1.ControllerBase.AppendController(StatusController_1.StatusController, this);
    };
    return Application;
}());
exports.default = Application;
//# sourceMappingURL=app.js.map