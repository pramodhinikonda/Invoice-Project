import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import swal from 'sweetalert2';
import { NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { UnitService } from '../../services/unit.service';
import { UnitType } from '../../services/unit.model';
import { UnitSaveComponent } from '../unit-save/unit-save.component';
var UnitViewComponent = /** @class */ (function () {
    function UnitViewComponent(unitService) {
        this.unitService = unitService;
        this.dtOptions = {
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'Units' },
                { extend: 'pdf', title: 'Units' }
            ]
        };
        this.unitTypes = UnitType;
        this.units = [];
        this.dtTrigger = new Subject();
        this.onDestroy = new Subject();
        this.deleteAlertOptions = {};
        this.deleteAlertOptions = {
            title: "Are you sure?",
            text: "Do you want to delete",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Yes, Delete',
            showLoaderOnConfirm: true,
            focusCancel: true,
        };
    }
    UnitViewComponent.prototype.ngOnInit = function () {
        this.fillUnits();
    };
    UnitViewComponent.prototype.fillUnits = function () {
        var _this = this;
        this.unitService.getUnits()
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            _this.units = data;
            _this.dtTrigger.next();
        });
    };
    UnitViewComponent.prototype.openNew = function () {
        this.unitSave.showModel();
    };
    UnitViewComponent.prototype.saveCallback = function (unitTransferObject) {
        if (unitTransferObject.unit) {
            var message = 'Unit Added.!';
            if (unitTransferObject.isNew)
                this.units.unshift(unitTransferObject.unit);
            else {
                var unitIndex = this.units.findIndex(function (unit) {
                    return unit.unitID === unitTransferObject.unit.unitID;
                });
                this.units[unitIndex] = unitTransferObject.unit;
                message = 'Unit Updates.!';
            }
            this.showAlert({ title: message, position: NotificationPosition.TopEnd, type: NotificationType.Success });
        }
    };
    UnitViewComponent.prototype.editUnit = function (unitIndex) {
        this.unitSave.editUnit(this.units[unitIndex]);
    };
    UnitViewComponent.prototype.deleteUnit = function (unitIndex) {
        var _this = this;
        this.unitService.delete(this.units[unitIndex].unitID)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            if (data) {
                _this.units.splice(unitIndex, 1);
                _this.showAlert({ title: 'Deleted Successfully..!', position: NotificationPosition.Center, type: NotificationType.Success });
            }
        });
    };
    UnitViewComponent.prototype.showAlert = function (notification) {
        swal.fire({
            type: notification.type,
            title: notification.title,
            position: notification.position,
            showConfirmButton: false,
            timer: 1000
        });
    };
    UnitViewComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
        this.dtTrigger.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild('unitSave'),
        tslib_1.__metadata("design:type", UnitSaveComponent)
    ], UnitViewComponent.prototype, "unitSave", void 0);
    UnitViewComponent = tslib_1.__decorate([
        Component({
            selector: 'unit-view',
            templateUrl: './unit-view.component.html',
            styleUrls: ['./unit-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UnitService])
    ], UnitViewComponent);
    return UnitViewComponent;
}());
export { UnitViewComponent };
//# sourceMappingURL=unit-view.component.js.map