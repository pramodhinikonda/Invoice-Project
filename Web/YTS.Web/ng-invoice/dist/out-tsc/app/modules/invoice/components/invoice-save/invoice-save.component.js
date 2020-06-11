import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { CellRendererComponent } from '../../../../shared/controls/cell-renderer/cell-renderer.component';
import { NumericEditorComponent } from '../../../../shared/controls/cell-renderer/numeric-editor.component';
import { InvoiceService } from '../../services/invoice.service';
var InvoiceSaveComponent = /** @class */ (function () {
    function InvoiceSaveComponent(invoiceService, router) {
        this.invoiceService = invoiceService;
        this.router = router;
        this.onDestroy = new Subject();
        this.deleteAlertOptions = {};
        this.invoiceGridColumnDef = [];
        this.modules = AllCommunityModules;
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
        this.invoiceGridColumnDef = [
            {
                headerName: 'Item Details', field: 'name', rowDrag: true, cellEditor: "agRichSelectCellEditor", cellEditorParams: {
                    cellHeight: 50,
                    values: ["Item1", "Item2"]
                }
            },
            { headerName: 'Quantity', field: 'quantity', width: 150, cellEditor: 'numericCellEditor' },
            { headerName: 'Rate', field: 'rate', cellEditor: 'numericCellEditor' },
            { headerName: 'Discount', field: 'discount', cellEditor: 'numericCellEditor' },
            { headerName: 'Tax', field: 'tax', cellEditor: 'numericCellEditor' },
            { headerName: 'Amount', field: 'amount', cellEditor: NumericEditorComponent },
            {
                width: 100,
                headerName: 'Actions',
                cellRendererFramework: CellRendererComponent,
                cellRendererParams: {
                    icon: 'fa-times remove-btn',
                    action: this.removeLineItem
                }
            }
        ];
        this.availableWindowHeight = (window.screen.height - 436);
        this.defaultColDef = {
            editable: true,
            resizable: true
        };
    }
    InvoiceSaveComponent.prototype.ngOnInit = function () {
        this.createInvoice();
        this.addLineItem();
    };
    InvoiceSaveComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    InvoiceSaveComponent.prototype.createInvoice = function () {
        this.invoice = {
            customerID: '',
            customerName: '',
            invoiceNumber: 'INV-000001',
            orderNumber: '',
            date: new Date().toDateString(),
            terms: '',
            dueDate: new Date().toDateString(),
            salesPerson: '',
            items: [],
            subTotal: 0,
            shippingCharge: 0,
            adjustment: 0,
            roundOff: 0,
            gst: 0,
            total: 0,
            paymentOptions: [],
            customerNotes: '',
            termConditions: '',
            emails: [],
            itemRateTax: '',
            placeOfSupply: ''
        };
    };
    InvoiceSaveComponent.prototype.addLineItem = function () {
        var newItem = {
            itemID: '',
            name: '',
            description: '',
            hsn: 0,
            type: '',
            quantity: 1,
            rate: 0,
            discount: 0,
            scale: '',
            tax: '',
            amount: 0,
            unit: ''
        };
        this.invoice.items.push(newItem);
        if (this.gridApi)
            this.gridApi.updateRowData({ add: [newItem] });
    };
    InvoiceSaveComponent.prototype.removeLineItem = function (grid) {
        grid.api.updateRowData({ remove: [grid.data] });
    };
    InvoiceSaveComponent.prototype.onCellValueChanged = function (params) {
        var colId = params.column.getId();
    };
    InvoiceSaveComponent.prototype.backToInvoice = function () {
        this.router.navigate(['/invoice']);
    };
    InvoiceSaveComponent.prototype.showAlert = function (notification) {
        swal.fire({
            type: notification.type,
            title: notification.title,
            position: notification.position,
            showConfirmButton: false,
            timer: 1000
        });
    };
    InvoiceSaveComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
    };
    InvoiceSaveComponent = tslib_1.__decorate([
        Component({
            selector: 'invoice-save',
            templateUrl: './invoice-save.component.html',
            styleUrls: ['./invoice-save.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [InvoiceService, Router])
    ], InvoiceSaveComponent);
    return InvoiceSaveComponent;
}());
export { InvoiceSaveComponent };
//# sourceMappingURL=invoice-save.component.js.map