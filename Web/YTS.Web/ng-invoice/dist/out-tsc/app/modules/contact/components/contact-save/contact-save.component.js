import * as tslib_1 from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../services/contact.model';
var ContactSaveComponent = /** @class */ (function () {
    function ContactSaveComponent(formBuilder, contactService) {
        this.formBuilder = formBuilder;
        this.contactService = contactService;
        this.confirmCallback = new EventEmitter();
        this.onDestroy = new Subject();
        this.submitted = false;
        this.loading = false;
        this.isNew = true;
    }
    ContactSaveComponent.prototype.ngOnInit = function () {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required]
        });
    };
    ContactSaveComponent.prototype.showModel = function () {
        this.saveModel.show();
    };
    ContactSaveComponent.prototype.editContact = function (contact) {
        if (contact) {
            this.f.name.setValue(contact.name);
            this.f.email.setValue(contact.email);
            this.f.mobile.setValue(contact.mobile);
            this.showModel();
            this.isNew = false;
            this.currentContact = contact;
        }
    };
    ContactSaveComponent.prototype.hideModel = function () {
        this.saveModel.hide();
        this.contactForm.reset();
    };
    Object.defineProperty(ContactSaveComponent.prototype, "f", {
        get: function () { return this.contactForm.controls; },
        enumerable: true,
        configurable: true
    });
    ContactSaveComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.contactForm.invalid) {
            return;
        }
        this.saveContact();
    };
    ContactSaveComponent.prototype.saveContact = function () {
        var _this = this;
        this.loading = true;
        var contact = new Contact();
        if (!this.isNew && this.currentContact) {
            contact.contactID = this.currentContact.contactID;
            contact.organizationID = this.currentContact.organizationID;
        }
        contact.name = this.f.name.value;
        contact.email = this.f.email.value;
        contact.mobile = this.f.mobile.value;
        this.contactService.save(contact)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(function (data) {
            if (data) {
                _this.loading = false;
                _this.confirmCallback.emit({ isNew: _this.isNew, contact: data });
                _this.hideModel();
            }
        });
    };
    ContactSaveComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
        this.onDestroy.complete();
    };
    tslib_1.__decorate([
        ViewChild('saveModel'),
        tslib_1.__metadata("design:type", ModalDirective)
    ], ContactSaveComponent.prototype, "saveModel", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ContactSaveComponent.prototype, "confirmCallback", void 0);
    ContactSaveComponent = tslib_1.__decorate([
        Component({
            selector: 'contact-save',
            templateUrl: './contact-save.component.html',
            styleUrls: ['./contact-save.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ContactService])
    ], ContactSaveComponent);
    return ContactSaveComponent;
}());
export { ContactSaveComponent };
//# sourceMappingURL=contact-save.component.js.map