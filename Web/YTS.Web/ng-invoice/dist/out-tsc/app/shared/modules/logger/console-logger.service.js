import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
export var isDebugMode = environment.production;
var noop = function () { return undefined; };
var ConsoleLoggerService = /** @class */ (function () {
    function ConsoleLoggerService() {
    }
    Object.defineProperty(ConsoleLoggerService.prototype, "info", {
        get: function () {
            if (isDebugMode) {
                return console.info.bind(console);
            }
            else {
                return noop;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsoleLoggerService.prototype, "warn", {
        get: function () {
            return console.warn.bind(console);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsoleLoggerService.prototype, "error", {
        get: function () {
            return console.error.bind(console);
        },
        enumerable: true,
        configurable: true
    });
    ConsoleLoggerService.prototype.invokeConsoleMethod = function (type, args) {
        var logFn = (console)[type] || console.info || noop;
        logFn.apply(console, [args]);
    };
    ConsoleLoggerService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' })
    ], ConsoleLoggerService);
    return ConsoleLoggerService;
}());
export { ConsoleLoggerService };
//# sourceMappingURL=console-logger.service.js.map