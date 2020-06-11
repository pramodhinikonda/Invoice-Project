import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgGridModule } from 'ag-grid-angular/main';

import { InvoiceRoutingModule } from './invoice-routing.module';

import { InvoiceService } from './services/invoice.service';
import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';
import { InvoiceSaveComponent } from './components/invoice-save/invoice-save.component';
import { CellRendererComponent } from '../../shared/controls/cell-renderer/cell-renderer.component';
import { NumericEditorComponent } from '../../shared/controls/cell-renderer/numeric-editor.component';



@NgModule({
  declarations: [InvoiceViewComponent, InvoiceSaveComponent, CellRendererComponent, NumericEditorComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AgGridModule.withComponents([CellRendererComponent, NumericEditorComponent])
  ],
  providers: [InvoiceService]
})
export class InvoiceModule { }
