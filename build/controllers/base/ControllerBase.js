"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBase = void 0;
var ControllerDecorators_1 = __importDefault(require("../../decorators/controllers/ControllerDecorators"));
var DependecyService_1 = __importDefault(require("../../dependencyInjection/DependecyService"));
var HttpVerbs_1 = require("../../enums/httpVerbs/HttpVerbs");
var ControllerBase = /** @class */ (function () {
    function ControllerBase() {
        this.Request = {};
        this.Response = {};
    }
    ControllerBase.prototype.OK = function (result) {
        this.Response.status(200);
        this.Response.json(result);
    };
    ControllerBase.prototype.Created = function () {
        this.Response.status(201);
        this.Response.end();
    };
    ControllerBase.prototype.BadRequest = function (result) {
        this.Response.status(400);
        this.Response.json(result);
    };
    ControllerBase.prototype.Error = function (result) {
        this.Response.status(500);
        this.Response.json(result);
    };
    ControllerBase.prototype.SendResponse = function (status, result) {
        this.Response.status(status);
        this.Response.json(result);
    };
    ControllerBase.AppendController = function (ctor, application) {
        var empty = new ctor();
        var methods = Reflect.ownKeys(empty.constructor.prototype).filter(function (m) {
            return typeof empty[m] == "function";
        });
        var route = ControllerDecorators_1.default.GetRoute(empty);
        if (!route)
            return;
        var _loop_1 = function (method) {
            var action = ControllerDecorators_1.default.GetAction(empty, method.toString());
            if (!action) {
                if (method.toString().indexOf("constructor") > -1)
                    return "continue";
                action = "/".concat(method.toString().trim().toLowerCase());
            }
            var verb = ControllerDecorators_1.default.GetVerb(empty, method.toString());
            if (!verb)
                verb = HttpVerbs_1.HTTPVerbs.GET;
            console.debug("appended : ", verb, "".concat(route).concat(action));
            application.Express[verb.toString().toLowerCase()]("".concat(route).concat(action), function (req, resp) {
                var _a;
                var midlewares = ControllerDecorators_1.default.GetMidlewares(empty).reverse();
                midlewares.push.apply(midlewares, ControllerDecorators_1.default.GetBefores(empty, method.toString()).reverse());
                if (midlewares) {
                    for (var _i = 0, midlewares_1 = midlewares; _i < midlewares_1.length; _i++) {
                        var method_1 = midlewares_1[_i];
                        method_1(req);
                    }
                }
                var args = ControllerDecorators_1.default.GetArgumentsHandler(empty, method.toString());
                var params = [];
                if (args) {
                    if (args.Arguments.length > 0) {
                        if (req.body && verb == (HttpVerbs_1.HTTPVerbs.POST || verb == HttpVerbs_1.HTTPVerbs.PUT))
                            params = args.CreateArgumentsList(req.body);
                        if (req.query)
                            params.push.apply(params, args.CreateArgumentsList(req.query));
                    }
                }
                var controller = DependecyService_1.default.ResolveCtor(empty.constructor);
                controller.Request = req;
                controller.Response = resp;
                (_a = controller)[method].apply(_a, params);
            });
        };
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var method = methods_1[_i];
            _loop_1(method);
        }
    };
    return ControllerBase;
}());
exports.ControllerBase = ControllerBase;
//# sourceMappingURL=ControllerBase.js.map