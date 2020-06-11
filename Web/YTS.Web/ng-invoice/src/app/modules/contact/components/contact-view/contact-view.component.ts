import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { Notification, NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { ContactService } from '../../services/contact.service';
import { IContact, ITransferObject } from '../../services/contact.model';
import { ContactSaveComponent } from '../contact-save/contact-save.component';

@Component({
  selector: 'contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {
  @ViewChild('contactSave') contactSave: ContactSaveComponent;

  dtOptions: any = {
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
      { extend: 'copy' },
      { extend: 'csv' },
      { extend: 'excel', title: 'Contacts' },
      { extend: 'pdf', title: 'Contacts' }
    ]
  };
  contacts: Array<IContact> = [];
  dtTrigger: Subject<void> = new Subject<void>();
  onDestroy: Subject<void> = new Subject<void>();
  saveComponent: ContactSaveComponent;
  deleteAlertOptions: SweetAlertOptions = {};

  constructor(private contactService: ContactService) {
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
    this.fillContacts();
  }

  fillContacts(): void {
    this.contactService.getContacts()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.contacts = data;
        this.dtTrigger.next();
      });
  }

  openNew() {
    this.contactSave.showModel();
  }

  saveCallback(contactTransferObject: ITransferObject): void {
    if (contactTransferObject.contact) {
      let message: string = 'Contact Added.!';
      if (contactTransferObject.isNew)
        this.contacts.unshift(contactTransferObject.contact);
      else {
        let contactIndex: number = this.contacts.findIndex((contact: IContact) => {
          return contact.contactID === contactTransferObject.contact.contactID;
        });
        this.contacts[contactIndex] = contactTransferObject.contact;
        message = 'Contact Updates.!';
      }
      this.showAlert({ title: message, position: NotificationPosition.TopEnd, type: NotificationType.Success });
    }
  }

  editContact(contactIndex: number): void {
    this.contactSave.editContact(this.contacts[contactIndex]);
  }

  deleteContact(contactIndex: number): void {
    this.contactService.delete(this.contacts[contactIndex].contactID)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.contacts.splice(contactIndex, 1);
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
