import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsEmptyPipe } from './isEmpty.pipe';
var PipeModule = /** @class */ (function () {
    function PipeModule() {
    }
    PipeModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                IsEmptyPipe
            ],
            exports: [IsEmptyPipe]
        })
    ], PipeModule);
    return PipeModule;
}());
export { PipeModule };
//# sourceMappingURL=pipe.module.js.map