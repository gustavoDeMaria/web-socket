"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var DateTime = /** @class */ (function () {
    function DateTime() {
        this.now = moment_timezone_1.default.tz("America/Sao_Paulo").utcOffset(0, true).toDate();
    }
    DateTime.Now = function () {
        return new DateTime().now;
    };
    return DateTime;
}());
exports.DateTime = DateTime;
//# sourceMappingURL=DateTime.js.map