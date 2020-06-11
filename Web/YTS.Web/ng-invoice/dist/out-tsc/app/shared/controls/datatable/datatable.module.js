import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from './directives/datatable.directive';
var DataTableModule = /** @class */ (function () {
    function DataTableModule() {
    }
    DataTableModule_1 = DataTableModule;
    DataTableModule.forRoot = function () {
        return {
            ngModule: DataTableModule_1
        };
    };
    var DataTableModule_1;
    DataTableModule = DataTableModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [DataTableDirective],
            exports: [DataTableDirective]
        })
    ], DataTableModule);
    return DataTableModule;
}());
export { DataTableModule };
//# sourceMappingURL=datatable.module.js.map