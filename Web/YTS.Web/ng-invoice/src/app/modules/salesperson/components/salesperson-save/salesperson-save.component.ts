import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SalesPersonService } from '../../services/salesperson.service';
import { SalesPerson, ISalesPerson } from '../../services/salesperson.model';

@Component({
  selector: 'salesperson-save',
  templateUrl: './salesperson-save.component.html',
  styleUrls: ['./salesperson-save.component.css']
})

export class SalesPersonSaveComponent implements OnInit, OnDestroy {
  @ViewChild('saveModel') saveModel: ModalDirective;
  @Output() confirmCallback = new EventEmitter();
  onDestroy: Subject<void> = new Subject<void>();

  salespersonForm: FormGroup;
  submitted = false;
  loading = false;
  isNew = true;
  currentSalesPerson: ISalesPerson

  constructor(private formBuilder: FormBuilder, private salespersonService: SalesPersonService) { }

  ngOnInit() {
    this.salespersonForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  showModel() {
    this.saveModel.show();
  }

  editSalesPerson(salesperson: ISalesPerson): void {
    if (salesperson) {
      this.f.name.setValue(salesperson.name);
      this.f.mobile.setValue(salesperson.mobile);
      this.showModel();
      this.isNew = false;
      this.currentSalesPerson = salesperson;
    }
  }

  hideModel(): void {
    this.saveModel.hide();
    this.salespersonForm.reset();
  }

  get f() { return this.salespersonForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.salespersonForm.invalid) {
      return;
    }
    this.saveSalesPerson();
  }

  saveSalesPerson(): void {
    this.loading = true;
    let salesperson: SalesPerson = new SalesPerson();
    if (!this.isNew && this.currentSalesPerson) {
      salesperson.salespersonID = this.currentSalesPerson.salespersonID;
      salesperson.organizationID = this.currentSalesPerson.organizationID;
    }
    salesperson.name = this.f.name.value;
    salesperson.mobile = this.f.mobile.value;
    this.salespersonService.save(salesperson)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.loading = false;
          this.confirmCallback.emit({ isNew: this.isNew, salesperson: data });
          this.hideModel();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
