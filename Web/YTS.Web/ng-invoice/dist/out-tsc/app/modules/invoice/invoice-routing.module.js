import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';
import { InvoiceSaveComponent } from './components/invoice-save/invoice-save.component';
var routes = [
    {
        path: '',
        component: InvoiceViewComponent
    },
    {
        path: 'create',
        component: InvoiceSaveComponent
    }
];
var InvoiceRoutingModule = /** @class */ (function () {
    function InvoiceRoutingModule() {
    }
    InvoiceRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], InvoiceRoutingModule);
    return InvoiceRoutingModule;
}());
export { InvoiceRoutingModule };
//# sourceMappingURL=invoice-routing.module.js.map