"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DependecyService = /** @class */ (function () {
    function DependecyService() {
    }
    DependecyService.RegisterFor = function (type, ctor, builder) {
        var defaultBuilder = function () { return Reflect.construct(ctor !== null && ctor !== void 0 ? ctor : type, []); };
        this._services.push({ Type: type, Builder: builder !== null && builder !== void 0 ? builder : defaultBuilder });
    };
    DependecyService.Register = function (type, builder) {
        var defaultBuilder = function () { return Reflect.construct(type, []); };
        this._services.push({ Type: type, Builder: builder !== null && builder !== void 0 ? builder : defaultBuilder });
    };
    DependecyService.Resolve = function (type, args) {
        var _a;
        return (_a = this._services.find(function (u) { return u.Type == type; })) === null || _a === void 0 ? void 0 : _a.Builder(args);
    };
    DependecyService.ResolveCtor = function (ctor, args) {
        var _a;
        return (_a = this._services.find(function (u) { return u.Type == ctor; })) === null || _a === void 0 ? void 0 : _a.Builder(args);
    };
    DependecyService._services = [];
    return DependecyService;
}());
exports.default = DependecyService;
//# sourceMappingURL=DependecyService.js.map