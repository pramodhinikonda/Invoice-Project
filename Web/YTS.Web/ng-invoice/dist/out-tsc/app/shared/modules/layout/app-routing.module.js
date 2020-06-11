import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
var routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: '../../../modules/login/login.module#LoginModule'
    },
    {
        path: '',
        loadChildren: '../../../modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard],
        data: { roles: ['SuperUser'] }
    },
    {
        path: 'unit',
        loadChildren: '../../../modules/unit/unit.module#UnitModule',
        canActivate: [AuthGuard],
        data: { roles: ['SuperUser'] }
    },
    {
        path: 'contact',
        loadChildren: '../../../modules/contact/contact.module#ContactModule',
        canActivate: [AuthGuard],
        data: { roles: ['SuperUser'] }
    },
    {
        path: 'salesperson',
        loadChildren: '../../../modules/salesperson/salesperson.module#SalesPersonModule',
        canActivate: [AuthGuard],
        data: { roles: ['SuperUser'] }
    },
    {
        path: 'invoice',
        loadChildren: '../../../modules/invoice/invoice.module#InvoiceModule',
        canActivate: [AuthGuard],
        data: { roles: ['SuperUser'] }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule],
            providers: [AuthGuard]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map