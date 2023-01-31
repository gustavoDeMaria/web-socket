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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
var ControllerDecorators_1 = __importDefault(require("../decorators/controllers/ControllerDecorators"));
var DependecyService_1 = __importDefault(require("../dependencyInjection/DependecyService"));
var HttpVerbs_1 = require("../enums/httpVerbs/HttpVerbs");
var SocketServer_1 = require("../webSocket/SocketServer");
var ControllerBase_1 = require("./base/ControllerBase");
var StatusController = /** @class */ (function (_super) {
    __extends(StatusController, _super);
    function StatusController() {
        return _super.call(this) || this;
    }
    //@CD.Before(s => { console.log('teste 02'); })
    StatusController.prototype.CheckStatus = function () {
        var server = DependecyService_1.default.Resolve(SocketServer_1.SocketServer);
        this.OK({ status: "OK", date: new Date() });
    };
    __decorate([
        ControllerDecorators_1.default.Verb(HttpVerbs_1.HTTPVerbs.GET),
        ControllerDecorators_1.default.Action("/check")
    ], StatusController.prototype, "CheckStatus", null);
    StatusController = __decorate([
        ControllerDecorators_1.default.Route("/status")
        //@CD.Use(s => { console.log('teste 01'); })
    ], StatusController);
    return StatusController;
}(ControllerBase_1.ControllerBase));
exports.StatusController = StatusController;
//# sourceMappingURL=statusController.js.map