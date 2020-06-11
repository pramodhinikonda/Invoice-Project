import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesPersonViewComponent } from './components/salesperson-view/salesperson-view.component';

const routes: Routes = [
  {
    path: '',
    component: SalesPersonViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesPersonRoutingModule { }
