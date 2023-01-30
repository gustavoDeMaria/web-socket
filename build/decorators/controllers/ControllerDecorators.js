"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ControllersDecorators = /** @class */ (function () {
    function ControllersDecorators() {
    }
    ControllersDecorators.Route = function (route) {
        return function (target) {
            Reflect.defineMetadata(ControllersDecorators.RouteKeyMetadata, route, target);
        };
    };
    ControllersDecorators.Use = function (midleware) {
        return function (target) {
            var _a;
            var current = (_a = Reflect.getMetadata(ControllersDecorators.ControllerMidlewaresKeyMetadata, target)) !== null && _a !== void 0 ? _a : [];
            current.push(midleware);
            Reflect.defineMetadata(ControllersDecorators.ControllerMidlewaresKeyMetadata, current, target);
        };
    };
    ControllersDecorators.GetMidlewares = function (controller) {
        var _a;
        return (_a = Reflect.getMetadata(ControllersDecorators.ControllerMidlewaresKeyMetadata, controller.constructor)) !== null && _a !== void 0 ? _a : [];
    };
    ControllersDecorators.Before = function (midleware) {
        return function (target, methodName, propertyDescriptor) {
            var _a;
            var current = (_a = Reflect.getMetadata(ControllersDecorators.ActionsMidlewaresKeyMetadata, target, methodName)) !== null && _a !== void 0 ? _a : [];
            current.push(midleware);
            ControllersDecorators.SetMetaData(ControllersDecorators.ActionsMidlewaresKeyMetadata, target, methodName, current);
        };
    };
    ControllersDecorators.GetBefores = function (controller, methodName) {
        var _a;
        return (_a = this.GetMetaData(ControllersDecorators.ActionsMidlewaresKeyMetadata, controller, methodName)) !== null && _a !== void 0 ? _a : [];
    };
    ControllersDecorators.GetRoute = function (controller) {
        return Reflect.getMetadata(ControllersDecorators.RouteKeyMetadata, controller.constructor);
    };
    ControllersDecorators.Verb = function (verb) {
        return function (target, methodName, propertyDescriptor) {
            ControllersDecorators.SetMetaData(ControllersDecorators.ActionVerbKeyMetadata, target, methodName, verb);
        };
    };
    ControllersDecorators.GetVerb = function (target, methodName) {
        var meta = this.GetMetaData(ControllersDecorators.ActionVerbKeyMetadata, target, methodName);
        return meta;
    };
    ControllersDecorators.Action = function (actionName) {
        return function (target, methodName, propertyDescriptor) {
            ControllersDecorators.SetMetaData(ControllersDecorators.ActionNameKeyMetadata, target, methodName, actionName);
        };
    };
    ControllersDecorators.GetAction = function (target, methodName) {
        var meta = this.GetMetaData(ControllersDecorators.ActionNameKeyMetadata, target, methodName);
        return meta;
    };
    ControllersDecorators.Argument = function (argName1, argName2, argName3, argName4, argName5, argName6) {
        return function (target, methodName, propertyDescriptor) {
            ControllersDecorators.SetMetaData(ControllersDecorators.ArgumentsHandlerKeyMetadata, target, methodName, {
                Arguments: [argName1, argName2, argName3, argName4, argName5, argName6],
                CreateArgumentsList: function (args) {
                    var results = [];
                    if (argName1 && args[argName1] != undefined)
                        results[0] = args[argName1];
                    if (argName2 && args[argName2] != undefined)
                        results[1] = args[argName2];
                    if (argName3 && args[argName3] != undefined)
                        results[2] = args[argName3];
                    if (argName4 && args[argName4] != undefined)
                        results[3] = args[argName4];
                    if (argName5 && args[argName5] != undefined)
                        results[4] = args[argName5];
                    if (argName6 && args[argName6] != undefined)
                        results[5] = args[argName6];
                    return results;
                }
            });
        };
    };
    ControllersDecorators.GetArgumentsHandler = function (target, methodName) {
        var handler = this.GetMetaData(ControllersDecorators.ArgumentsHandlerKeyMetadata, target, methodName);
        return handler;
    };
    ControllersDecorators.SetMetaData = function (key, target, methodName, value) {
        var meta = Reflect.getOwnMetadata(key, target, methodName);
        if (!meta)
            Reflect.defineMetadata(key, value, target, methodName);
    };
    ControllersDecorators.GetMetaData = function (key, target, methodName) {
        var meta = Reflect.getMetadata(key, target, methodName);
        if (meta != undefined)
            return meta;
        else
            return undefined;
    };
    ControllersDecorators.RouteKeyMetadata = "meta:controllerRoute";
    ControllersDecorators.ActionVerbKeyMetadata = "meta:actionVerb";
    ControllersDecorators.ActionNameKeyMetadata = "meta:actionName";
    ControllersDecorators.ArgumentsHandlerKeyMetadata = "meta:argHandler";
    ControllersDecorators.ControllerMidlewaresKeyMetadata = "meta:controllerMidlewaresKey";
    ControllersDecorators.ActionsMidlewaresKeyMetadata = "meta:actionMidlewaresKey";
    return ControllersDecorators;
}());
exports.default = ControllersDecorators;
//# sourceMappingURL=ControllerDecorators.js.map