import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalesPersonViewComponent } from './components/salesperson-view/salesperson-view.component';
var routes = [
    {
        path: '',
        component: SalesPersonViewComponent
    }
];
var SalesPersonRoutingModule = /** @class */ (function () {
    function SalesPersonRoutingModule() {
    }
    SalesPersonRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], SalesPersonRoutingModule);
    return SalesPersonRoutingModule;
}());
export { SalesPersonRoutingModule };
//# sourceMappingURL=salesperson-routing.module.js.map