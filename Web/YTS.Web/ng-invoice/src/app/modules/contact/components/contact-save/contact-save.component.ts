import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContactService } from '../../services/contact.service';
import { Contact, IContact } from '../../services/contact.model';

@Component({
  selector: 'contact-save',
  templateUrl: './contact-save.component.html',
  styleUrls: ['./contact-save.component.css']
})

export class ContactSaveComponent implements OnInit, OnDestroy {
  @ViewChild('saveModel') saveModel: ModalDirective;
  @Output() confirmCallback = new EventEmitter();
  onDestroy: Subject<void> = new Subject<void>();

  contactForm: FormGroup;
  submitted = false;
  loading = false;
  isNew = true;
  currentContact: IContact

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  showModel() {
    this.saveModel.show();
  }

  editContact(contact: IContact): void {
    if (contact) {
      this.f.name.setValue(contact.name);
      this.f.email.setValue(contact.email);
      this.f.mobile.setValue(contact.mobile);
      this.showModel();
      this.isNew = false;
      this.currentContact = contact;
    }
  }

  hideModel(): void {
    this.saveModel.hide();
    this.contactForm.reset();
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.saveContact();
  }

  saveContact(): void {
    this.loading = true;
    let contact: Contact = new Contact();
    if (!this.isNew && this.currentContact) {
      contact.contactID = this.currentContact.contactID;
      contact.organizationID = this.currentContact.organizationID;
    }
    contact.name = this.f.name.value;
    contact.email = this.f.email.value;
    contact.mobile = this.f.mobile.value;
    this.contactService.save(contact)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.loading = false;
          this.confirmCallback.emit({ isNew: this.isNew, contact: data });
          this.hideModel();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
