import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { InvoiceService } from '../../services/invoice.service';
var InvoiceViewComponent = /** @class */ (function () {
    function InvoiceViewComponent(invoiceService, router) {
        this.invoiceService = invoiceService;
        this.router = router;
        this.invoices = [];
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
    InvoiceViewComponent.prototype.ngOnInit = function () {
        this.fillInvoices();
    };
    InvoiceViewComponent.prototype.fillInvoices = function () {
    };
    InvoiceViewComponent.prototype.createInvoice = function () {
        this.router.navigate(['/invoice/create']);
    };
    InvoiceViewComponent.prototype.showAlert = function (notification) {
        swal.fire({
            type: notification.type,
            title: notification.title,
            position: notification.position,
            showConfirmButton: false,
            timer: 1000
        });
    };
    InvoiceViewComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
    };
    InvoiceViewComponent = tslib_1.__decorate([
        Component({
            selector: 'invoice-view',
            templateUrl: './invoice-view.component.html',
            styleUrls: ['./invoice-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [InvoiceService, Router])
    ], InvoiceViewComponent);
    return InvoiceViewComponent;
}());
export { InvoiceViewComponent };
//# sourceMappingURL=invoice-view.component.js.map