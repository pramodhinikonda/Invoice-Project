import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { Notification, NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { UnitService } from '../../services/unit.service';
import { IUnit, UnitType, ITransferObject } from '../../services/unit.model';
import { UnitSaveComponent } from '../unit-save/unit-save.component';

@Component({
  selector: 'unit-view',
  templateUrl: './unit-view.component.html',
  styleUrls: ['./unit-view.component.css']
})
export class UnitViewComponent implements OnInit, OnDestroy {
  @ViewChild('unitSave') unitSave: UnitSaveComponent;

  dtOptions: any = {
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
      { extend: 'copy' },
      { extend: 'csv' },
      { extend: 'excel', title: 'Units' },
      { extend: 'pdf', title: 'Units' }
    ]
  };
  unitTypes = UnitType;
  units: Array<IUnit> = [];
  dtTrigger: Subject<void> = new Subject<void>();
  onDestroy: Subject<void> = new Subject<void>();
  saveComponent: UnitSaveComponent;
  deleteAlertOptions: SweetAlertOptions = {};

  constructor(private unitService: UnitService) {
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
    this.fillUnits();
  }

  fillUnits(): void {
    this.unitService.getUnits()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.units = data;
        this.dtTrigger.next();
      });
  }

  openNew() {
    this.unitSave.showModel();
  }

  saveCallback(unitTransferObject: ITransferObject): void {
    if (unitTransferObject.unit) {
      let message: string = 'Unit Added.!';
      if (unitTransferObject.isNew)
        this.units.unshift(unitTransferObject.unit);
      else {
        let unitIndex: number = this.units.findIndex((unit: IUnit) => {
          return unit.unitID === unitTransferObject.unit.unitID;
        });
        this.units[unitIndex] = unitTransferObject.unit;
        message = 'Unit Updates.!';
      }
      this.showAlert({ title: message, position: NotificationPosition.TopEnd, type: NotificationType.Success });
    }
  }

  editUnit(unitIndex: number): void {
    this.unitSave.editUnit(this.units[unitIndex]);
  }

  deleteUnit(unitIndex: number): void {
    this.unitService.delete(this.units[unitIndex].unitID)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.units.splice(unitIndex, 1);
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
