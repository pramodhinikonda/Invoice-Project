import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitViewComponent } from './components/unit-view/unit-view.component';

const routes: Routes = [
  {
    path: '',
    component: UnitViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
