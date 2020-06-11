import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExceptionHandlerComponent } from './components/exception-handler/exception-handler.component';
var routes = [
    { path: 'exception', component: ExceptionHandlerComponent },
    { path: 'unauthorized', component: ExceptionHandlerComponent, data: { error: 401 } },
    { path: '**', component: ExceptionHandlerComponent, data: { error: 404 } },
];
var ExceptionRoutingModule = /** @class */ (function () {
    function ExceptionRoutingModule() {
    }
    ExceptionRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ExceptionRoutingModule);
    return ExceptionRoutingModule;
}());
export { ExceptionRoutingModule };
//# sourceMappingURL=exception-routing.module.js.map