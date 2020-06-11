import * as tslib_1 from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnitService } from '../../services/unit.service';
import { UnitType, Unit } from '../../services/unit.model';
var UnitSaveComponent = /** @class */ (function () {
    function UnitSaveComponent(formBuilder, unitService) {
        this.formBuilder = formBuilder;
        this.unitService = unitService;
        this.confirmCallback = new EventEmitter();
        this.onDestroy = new Subject();
        this.submitted = false;
        this.loading = false;
        this.unitTypes = UnitType;
        this.isNew = true;
    }
    UnitSaveComponent.prototype.ngOnInit = function () {
        this.unitForm = this.formBuilder.group({
            name: ['', Validators.required],
            type: [null, Validators.required],
            allUnit: ['', Validators.required]
        });
        this.fillUnits();
    };
    UnitSaveComponent.prototype.fillUnits = function () {
        var _this = this;
        this.unitService.getUnits()
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            _this.allUnits = data;
        });
    };
    UnitSaveComponent.prototype.showModel = function () {
        this.saveModel.show();
    };
    UnitSaveComponent.prototype.editUnit = function (unit) {
        if (unit) {
            this.f.name.setValue(unit.name);
            this.f.type.setValue(unit.type);
            this.showModel();
            this.isNew = false;
            this.currentUnit = unit;
        }
    };
    UnitSaveComponent.prototype.hideModel = function () {
        this.saveModel.hide();
        this.unitForm.reset();
    };
    Object.defineProperty(UnitSaveComponent.prototype, "f", {
        get: function () { return this.unitForm.controls; },
        enumerable: true,
        configurable: true
    });
    UnitSaveComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.unitForm.invalid) {
            return;
        }
        this.saveUnit();
    };
    UnitSaveComponent.prototype.saveUnit = function () {
        var _this = this;
        this.loading = true;
        var unit = new Unit();
        if (!this.isNew && this.currentUnit) {
            unit.unitID = this.currentUnit.unitID;
            unit.organizationID = this.currentUnit.organizationID;
        }
        unit.name = this.f.name.value;
        unit.type = this.f.type.value;
        this.unitService.save(unit)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            if (data) {
                _this.loading = false;
                _this.confirmCallback.emit({ isNew: _this.isNew, unit: data });
                _this.hideModel();
            }
        });
    };
    UnitSaveComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
    };
    tslib_1.__decorate([
        ViewChild('saveModel'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], UnitSaveComponent.prototype, "saveModel", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], UnitSaveComponent.prototype, "confirmCallback", void 0);
    UnitSaveComponent = tslib_1.__decorate([
        Component({
            selector: 'unit-save',
            templateUrl: './unit-save.component.html',
            styleUrls: ['./unit-save.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, UnitService])
    ], UnitSaveComponent);
    return UnitSaveComponent;
}());
export { UnitSaveComponent };
//# sourceMappingURL=unit-save.component.js.map