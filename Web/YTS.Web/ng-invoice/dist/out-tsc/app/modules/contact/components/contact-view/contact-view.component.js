import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import swal from 'sweetalert2';
import { NotificationPosition, NotificationType } from '../../../../shared/models/common.model';
import { ContactService } from '../../services/contact.service';
import { ContactSaveComponent } from '../contact-save/contact-save.component';
var ContactViewComponent = /** @class */ (function () {
    function ContactViewComponent(contactService) {
        this.contactService = contactService;
        this.dtOptions = {
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                { extend: 'copy' },
                { extend: 'csv' },
                { extend: 'excel', title: 'Contacts' },
                { extend: 'pdf', title: 'Contacts' }
            ]
        };
        this.contacts = [];
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
    ContactViewComponent.prototype.ngOnInit = function () {
        this.fillContacts();
    };
    ContactViewComponent.prototype.fillContacts = function () {
        var _this = this;
        this.contactService.getContacts()
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            _this.contacts = data;
            _this.dtTrigger.next();
        });
    };
    ContactViewComponent.prototype.openNew = function () {
        this.contactSave.showModel();
    };
    ContactViewComponent.prototype.saveCallback = function (contactTransferObject) {
        if (contactTransferObject.contact) {
            var message = 'Contact Added.!';
            if (contactTransferObject.isNew)
                this.contacts.unshift(contactTransferObject.contact);
            else {
                var contactIndex = this.contacts.findIndex(function (contact) {
                    return contact.contactID === contactTransferObject.contact.contactID;
                });
                this.contacts[contactIndex] = contactTransferObject.contact;
                message = 'Contact Updates.!';
            }
            this.showAlert({ title: message, position: NotificationPosition.TopEnd, type: NotificationType.Success });
        }
    };
    ContactViewComponent.prototype.editContact = function (contactIndex) {
        this.contactSave.editContact(this.contacts[contactIndex]);
    };
    ContactViewComponent.prototype.deleteContact = function (contactIndex) {
        var _this = this;
        this.contactService.delete(this.contacts[contactIndex].contactID)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            if (data) {
                _this.contacts.splice(contactIndex, 1);
                _this.showAlert({ title: 'Deleted Successfully..!', position: NotificationPosition.Center, type: NotificationType.Success });
            }
        });
    };
    ContactViewComponent.prototype.showAlert = function (notification) {
        swal.fire({
            type: notification.type,
            title: notification.title,
            position: notification.position,
            showConfirmButton: false,
            timer: 1000
        });
    };
    ContactViewComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
        this.dtTrigger.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild('contactSave'),
        tslib_1.__metadata("design:type", ContactSaveComponent)
    ], ContactViewComponent.prototype, "contactSave", void 0);
    ContactViewComponent = tslib_1.__decorate([
        Component({
            selector: 'contact-view',
            templateUrl: './contact-view.component.html',
            styleUrls: ['./contact-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ContactService])
    ], ContactViewComponent);
    return ContactViewComponent;
}());
export { ContactViewComponent };
//# sourceMappingURL=contact-view.component.js.map