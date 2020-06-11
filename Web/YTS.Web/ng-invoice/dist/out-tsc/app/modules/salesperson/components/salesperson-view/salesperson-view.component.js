import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import swal from 'sweetalert2';
import { NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { SalesPersonService } from '../../services/salesperson.service';
import { SalesPersonSaveComponent } from '../salesperson-save/salesperson-save.component';
var SalesPersonViewComponent = /** @class */ (function () {
    function SalesPersonViewComponent(salespersonService) {
        this.salespersonService = salespersonService;
        this.dtOptions = {
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'SalesPersons' },
                { extend: 'pdf', title: 'SalesPersons' }
            ]
        };
        this.salespersons = [];
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
    SalesPersonViewComponent.prototype.ngOnInit = function () {
        this.fillSalesPersons();
    };
    SalesPersonViewComponent.prototype.fillSalesPersons = function () {
        var _this = this;
        this.salespersonService.getSalesPersons()
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            _this.salespersons = data;
            _this.dtTrigger.next();
        });
    };
    SalesPersonViewComponent.prototype.openNew = function () {
        this.salespersonSave.showModel();
    };
    SalesPersonViewComponent.prototype.saveCallback = function (salespersonTransferObject) {
        if (salespersonTransferObject.salesperson) {
            var message = 'Sales Person Added.!';
            if (salespersonTransferObject.isNew)
                this.salespersons.unshift(salespersonTransferObject.salesperson);
            else {
                var salespersonIndex = this.salespersons.findIndex(function (salesperson) {
                    return salesperson.salespersonID === salespersonTransferObject.salesperson.salespersonID;
                });
                this.salespersons[salespersonIndex] = salespersonTransferObject.salesperson;
                message = 'Sales Person Updates.!';
            }
            this.showAlert({ title: message, position: NotificationPosition.TopEnd, type: NotificationType.Success });
        }
    };
    SalesPersonViewComponent.prototype.editSalesPerson = function (salespersonIndex) {
        this.salespersonSave.editSalesPerson(this.salespersons[salespersonIndex]);
    };
    SalesPersonViewComponent.prototype.deleteSalesPerson = function (salespersonIndex) {
        var _this = this;
        this.salespersonService.delete(this.salespersons[salespersonIndex].salespersonID)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            if (data) {
                _this.salespersons.splice(salespersonIndex, 1);
                _this.showAlert({ title: 'Deleted Successfully..!', position: NotificationPosition.Center, type: NotificationType.Success });
            }
        });
    };
    SalesPersonViewComponent.prototype.showAlert = function (notification) {
        swal.fire({
            type: notification.type,
            title: notification.title,
            position: notification.position,
            showConfirmButton: false,
            timer: 1000
        });
    };
    SalesPersonViewComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
        this.dtTrigger.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild('salespersonSave'),
        tslib_1.__metadata("design:type", SalesPersonSaveComponent)
    ], SalesPersonViewComponent.prototype, "salespersonSave", void 0);
    SalesPersonViewComponent = tslib_1.__decorate([
        Component({
            selector: 'salesperson-view',
            templateUrl: './salesperson-view.component.html',
            styleUrls: ['./salesperson-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [SalesPersonService])
    ], SalesPersonViewComponent);
    return SalesPersonViewComponent;
}());
export { SalesPersonViewComponent };
//# sourceMappingURL=salesperson-view.component.js.map