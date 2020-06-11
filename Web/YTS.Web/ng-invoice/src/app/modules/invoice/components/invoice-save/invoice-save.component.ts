import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { AllCommunityModules, Module } from "@ag-grid-community/all-modules";
import { AgGridAngular } from 'ag-grid-angular';

import { NumericEditorComponent } from '../../../../shared/controls/cell-renderer/numeric-editor.component';
import { CellRendererComponent } from '../../../../shared/controls/cell-renderer/cell-renderer.component';
import { Notification, NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { InvoiceService } from '../../services/invoice.service';
import { IInvoice, IInvoiceItem } from '../../services/invoice.model';

@Component({
  selector: 'invoice-save',
  templateUrl: './invoice-save.component.html',
  styleUrls: ['./invoice-save.component.css']
})
export class InvoiceSaveComponent implements OnInit, OnDestroy {
  private gridApi;
  private gridColumnApi;
  availableWindowHeight: any;
  invoice: IInvoice;
  onDestroy: Subject<void> = new Subject<void>();
  deleteAlertOptions: SweetAlertOptions = {};
  invoiceGridColumnDef: Array<any> = [];
  public modules: Module[] = AllCommunityModules;
  private defaultColDef;
  private components;

  constructor(private invoiceService: InvoiceService, private router: Router) {
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
    }
    this.invoiceGridColumnDef = [
      {
        headerName: 'Item Details', field: 'name', rowDrag: true, cellEditor: "agSelectCellEditor", cellEditorParams: {
          cellHeight: 50,
          values: ["Item1", "Item2"]
        }
      },
      { headerName: 'Quantity', field: 'quantity', width: 150, cellEditorFramework: NumericEditorComponent },
      { headerName: 'Rate', field: 'rate', cellEditorFramework: NumericEditorComponent, },
      { headerName: 'Discount', field: 'discount', cellEditorFramework: NumericEditorComponent, },
      { headerName: 'Tax', field: 'tax', cellEditorFramework: NumericEditorComponent, },
      { headerName: 'Amount', field: 'amount', cellEditorFramework: NumericEditorComponent, },
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
    this.components = { numericCellEditor: NumericEditorComponent };
  }

  ngOnInit() {
    this.createInvoice();
    this.addLineItem();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  createInvoice(): void {
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
    }
  }

  addLineItem(): void {
    let newItem: IInvoiceItem = {
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
    }
    this.invoice.items.push(newItem);
    if (this.gridApi)
      this.gridApi.updateRowData({ add: [newItem] });
  }

  removeLineItem(grid: any): void {
    grid.api.updateRowData({ remove: [grid.data] });
  }

  onCellValueChanged(params) {
    var colId = params.column.getId();
  }

  backToInvoice(): void {
    this.router.navigate(['/invoice'])
  }

  showAlert(notification: Notification) {
    swal.fire({
      type: notification.type,
      title: notification.title,
      position: notification.position,
      showConfirmButton: false,
      timer: 1000
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
