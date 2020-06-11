import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { Role } from '../../models/auth.model';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
