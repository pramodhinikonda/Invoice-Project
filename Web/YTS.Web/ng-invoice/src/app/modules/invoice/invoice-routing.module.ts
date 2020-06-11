import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';
import { InvoiceSaveComponent } from './components/invoice-save/invoice-save.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceViewComponent
  },
  {
    path: 'create',
    component: InvoiceSaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
