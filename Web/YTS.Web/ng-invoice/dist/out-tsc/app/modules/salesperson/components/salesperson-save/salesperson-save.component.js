import * as tslib_1 from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SalesPersonService } from '../../services/salesperson.service';
import { SalesPerson } from '../../services/salesperson.model';
var SalesPersonSaveComponent = /** @class */ (function () {
    function SalesPersonSaveComponent(formBuilder, salespersonService) {
        this.formBuilder = formBuilder;
        this.salespersonService = salespersonService;
        this.confirmCallback = new EventEmitter();
        this.onDestroy = new Subject();
        this.submitted = false;
        this.loading = false;
        this.isNew = true;
    }
    SalesPersonSaveComponent.prototype.ngOnInit = function () {
        this.salespersonForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required]
        });
    };
    SalesPersonSaveComponent.prototype.showModel = function () {
        this.saveModel.show();
    };
    SalesPersonSaveComponent.prototype.editSalesPerson = function (salesperson) {
        if (salesperson) {
            this.f.name.setValue(salesperson.name);
            this.f.mobile.setValue(salesperson.mobile);
            this.showModel();
            this.isNew = false;
            this.currentSalesPerson = salesperson;
        }
    };
    SalesPersonSaveComponent.prototype.hideModel = function () {
        this.saveModel.hide();
        this.salespersonForm.reset();
    };
    Object.defineProperty(SalesPersonSaveComponent.prototype, "f", {
        get: function () { return this.salespersonForm.controls; },
        enumerable: true,
        configurable: true
    });
    SalesPersonSaveComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.salespersonForm.invalid) {
            return;
        }
        this.saveSalesPerson();
    };
    SalesPersonSaveComponent.prototype.saveSalesPerson = function () {
        var _this = this;
        this.loading = true;
        var salesperson = new SalesPerson();
        if (!this.isNew && this.currentSalesPerson) {
            salesperson.salespersonID = this.currentSalesPerson.salespersonID;
            salesperson.organizationID = this.currentSalesPerson.organizationID;
        }
        salesperson.name = this.f.name.value;
        salesperson.mobile = this.f.mobile.value;
        this.salespersonService.save(salesperson)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            if (data) {
                _this.loading = false;
                _this.confirmCallback.emit({ isNew: _this.isNew, salesperson: data });
                _this.hideModel();
            }
        });
    };
    SalesPersonSaveComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
    };
    tslib_1.__decorate([
        ViewChild('saveModel'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], SalesPersonSaveComponent.prototype, "saveModel", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SalesPersonSaveComponent.prototype, "confirmCallback", void 0);
    SalesPersonSaveComponent = tslib_1.__decorate([
        Component({
            selector: 'salesperson-save',
            templateUrl: './salesperson-save.component.html',
            styleUrls: ['./salesperson-save.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, SalesPersonService])
    ], SalesPersonSaveComponent);
    return SalesPersonSaveComponent;
}());
export { SalesPersonSaveComponent };
//# sourceMappingURL=salesperson-save.component.js.map