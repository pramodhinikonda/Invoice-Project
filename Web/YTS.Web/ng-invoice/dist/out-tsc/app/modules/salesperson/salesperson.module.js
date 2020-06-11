import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SalesPersonRoutingModule } from './salesperson-routing.module';
import { DataTableModule } from '../../shared/controls/datatable/datatable.module';
import { SalesPersonService } from './services/salesperson.service';
import { SalesPersonViewComponent } from './components/salesperson-view/salesperson-view.component';
import { SalesPersonSaveComponent } from './components/salesperson-save/salesperson-save.component';
var SalesPersonModule = /** @class */ (function () {
    function SalesPersonModule() {
    }
    SalesPersonModule = tslib_1.__decorate([
        NgModule({
            declarations: [SalesPersonViewComponent, SalesPersonSaveComponent],
            imports: [
                CommonModule,
                SalesPersonRoutingModule,
                DataTableModule,
                FormsModule,
                ReactiveFormsModule,
                NgSelectModule,
                NgOptionHighlightModule,
                ModalModule.forRoot(),
                SweetAlert2Module.forRoot()
            ],
            providers: [SalesPersonService]
        })
    ], SalesPersonModule);
    return SalesPersonModule;
}());
export { SalesPersonModule };
//# sourceMappingURL=salesperson.module.js.map