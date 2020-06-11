import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleLoggerService } from './console-logger.service';
import { LoggerService } from './logger.service';
var LoggerModule = /** @class */ (function () {
    function LoggerModule() {
    }
    LoggerModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            providers: [{ provide: LoggerService, useClass: ConsoleLoggerService }]
        })
    ], LoggerModule);
    return LoggerModule;
}());
export { LoggerModule };
//# sourceMappingURL=logger.module.js.map