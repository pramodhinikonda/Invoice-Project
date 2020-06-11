import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var noop = function () { return undefined; };
var Logger = /** @class */ (function () {
    function Logger() {
    }
    return Logger;
}());
export { Logger };
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.invokeConsoleMethod = function (type, args) { }; // tslint:disable-line no-empty
    LoggerService = tslib_1.__decorate([
        Injectable()
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=logger.service.js.map