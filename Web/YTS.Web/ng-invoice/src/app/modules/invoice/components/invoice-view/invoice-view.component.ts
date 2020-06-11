import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { Notification, NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { InvoiceService } from '../../services/invoice.service';
import { IInvoice } from '../../services/invoice.model';

@Component({
  selector: 'invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit, OnDestroy {

  invoices: Array<IInvoice> = [];
  onDestroy: Subject<void> = new Subject<void>();
  deleteAlertOptions: SweetAlertOptions = {};

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
  }

  ngOnInit() {
    this.fillInvoices();
  }

  fillInvoices(): void {

  }

  createInvoice(): void {
    this.router.navigate(['/invoice/create']);
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
