import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ContactRoutingModule } from './contact-routing.module';
import { DataTableModule } from '../../shared/controls/datatable/datatable.module';
import { ContactService } from './services/contact.service';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
import { ContactSaveComponent } from './components/contact-save/contact-save.component';
var ContactModule = /** @class */ (function () {
    function ContactModule() {
    }
    ContactModule = tslib_1.__decorate([
        NgModule({
            declarations: [ContactViewComponent, ContactSaveComponent],
            imports: [
                CommonModule,
                ContactRoutingModule,
                DataTableModule,
                FormsModule,
                ReactiveFormsModule,
                NgSelectModule,
                NgOptionHighlightModule,
                ModalModule.forRoot(),
                SweetAlert2Module.forRoot()
            ],
            providers: [ContactService]
        })
    ], ContactModule);
    return ContactModule;
}());
export { ContactModule };
//# sourceMappingURL=contact.module.js.map