import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { UnitRoutingModule } from './unit-routing.module';
import { DataTableModule } from '../../shared/controls/datatable/datatable.module';

import { UnitService } from './services/unit.service';
import { UnitViewComponent } from './components/unit-view/unit-view.component';
import { UnitSaveComponent } from './components/unit-save/unit-save.component';

@NgModule({
  declarations: [UnitViewComponent, UnitSaveComponent],
  imports: [
    CommonModule,
    UnitRoutingModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [UnitService]
})
export class UnitModule { }
