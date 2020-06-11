import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitViewComponent } from './components/unit-view/unit-view.component';
var routes = [
    {
        path: '',
        component: UnitViewComponent
    }
];
var UnitRoutingModule = /** @class */ (function () {
    function UnitRoutingModule() {
    }
    UnitRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], UnitRoutingModule);
    return UnitRoutingModule;
}());
export { UnitRoutingModule };
//# sourceMappingURL=unit-routing.module.js.map