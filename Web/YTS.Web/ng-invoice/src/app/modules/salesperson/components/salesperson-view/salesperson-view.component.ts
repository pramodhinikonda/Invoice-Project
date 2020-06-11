import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { Notification, NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { SalesPersonService } from '../../services/salesperson.service';
import { ISalesPerson, ITransferObject } from '../../services/salesperson.model';
import { SalesPersonSaveComponent } from '../salesperson-save/salesperson-save.component';

@Component({
  selector: 'salesperson-view',
  templateUrl: './salesperson-view.component.html',
  styleUrls: ['./salesperson-view.component.css']
})
export class SalesPersonViewComponent implements OnInit, OnDestroy {
  @ViewChild('salespersonSave') salespersonSave: SalesPersonSaveComponent;

  dtOptions: any = {
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
      { extend: 'copy' },
      { extend: 'csv' },
      { extend: 'excel', title: 'SalesPersons' },
      { extend: 'pdf', title: 'SalesPersons' }
    ]
  };
  salespersons: Array<ISalesPerson> = [];
  dtTrigger: Subject<void> = new Subject<void>();
  onDestroy: Subject<void> = new Subject<void>();
  saveComponent: SalesPersonSaveComponent;
  deleteAlertOptions: SweetAlertOptions = {};

  constructor(private salespersonService: SalesPersonService) {
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
    this.fillSalesPersons();
  }

  fillSalesPersons(): void {
    this.salespersonService.getSalesPersons()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.salespersons = data;
        this.dtTrigger.next();
      });
  }

  openNew() {
    this.salespersonSave.showModel();
  }

  saveCallback(salespersonTransferObject: ITransferObject): void {
    if (salespersonTransferObject.salesperson) {
      let message: string = 'Sales Person Added.!';
      if (salespersonTransferObject.isNew)
        this.salespersons.unshift(salespersonTransferObject.salesperson);
      else {
        let salespersonIndex: number = this.salespersons.findIndex((salesperson: ISalesPerson) => {
          return salesperson.salespersonID === salespersonTransferObject.salesperson.salespersonID;
        });
        this.salespersons[salespersonIndex] = salespersonTransferObject.salesperson;
        message = 'Sales Person Updates.!';
      }
      this.showAlert({ title: message, position: NotificationPosition.TopEnd, type: NotificationType.Success });
    }
  }

  editSalesPerson(salespersonIndex: number): void {
    this.salespersonSave.editSalesPerson(this.salespersons[salespersonIndex]);
  }

  deleteSalesPerson(salespersonIndex: number): void {
    this.salespersonService.delete(this.salespersons[salespersonIndex].salespersonID)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.salespersons.splice(salespersonIndex, 1);
          this.showAlert({ title: 'Deleted Successfully..!', position: NotificationPosition.Center, type: NotificationType.Success });
        }
      });
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
    this.dtTrigger.unsubscribe();
  }
}
