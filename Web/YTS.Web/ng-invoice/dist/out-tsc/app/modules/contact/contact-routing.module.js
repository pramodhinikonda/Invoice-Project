import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
var routes = [
    {
        path: '',
        component: ContactViewComponent
    }
];
var ContactRoutingModule = /** @class */ (function () {
    function ContactRoutingModule() {
    }
    ContactRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ContactRoutingModule);
    return ContactRoutingModule;
}());
export { ContactRoutingModule };
//# sourceMappingURL=contact-routing.module.js.map