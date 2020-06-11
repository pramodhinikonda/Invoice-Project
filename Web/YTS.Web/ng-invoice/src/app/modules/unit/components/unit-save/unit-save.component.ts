import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnitService } from '../../services/unit.service';
import { UnitType, Unit, IUnit } from '../../services/unit.model';

@Component({
    selector: 'unit-save',
    templateUrl: './unit-save.component.html',
    styleUrls: ['./unit-save.component.css']
})

export class UnitSaveComponent implements OnInit, OnDestroy {
    @ViewChild('saveModel') saveModel: ModalDirective;
    @Output() confirmCallback = new EventEmitter();
    onDestroy: Subject<void> = new Subject<void>();

    unitForm: FormGroup;
    submitted = false;
    loading = false;
    unitTypes = UnitType;
    isNew = true;
    currentUnit: IUnit;
    // Temp
    allUnits: Array<IUnit>;

    constructor(private formBuilder: FormBuilder, private unitService: UnitService) { }

    ngOnInit() {
        this.unitForm = this.formBuilder.group({
            name: ['', Validators.required],
            type: [null, Validators.required],
            allUnit: ['', Validators.required]
        });
        this.fillUnits();
    }

    fillUnits(): void {
        this.unitService.getUnits()
            .pipe(takeUntil(this.onDestroy))
            .subscribe(data => {
                this.allUnits = data;
            });
    }

    showModel() {
        this.saveModel.show();
    }

    editUnit(unit: IUnit): void {
        if (unit) {
            this.f.name.setValue(unit.name);
            this.f.type.setValue(unit.type);
            this.showModel();
            this.isNew = false;
            this.currentUnit = unit;
        }
    }

    hideModel(): void {
        this.saveModel.hide();
        this.unitForm.reset();
    }

    get f() { return this.unitForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.unitForm.invalid) {
            return;
        }
        this.saveUnit();
    }

    saveUnit(): void {
        this.loading = true;
        let unit: Unit = new Unit();
        if (!this.isNew && this.currentUnit) {
            unit.unitID = this.currentUnit.unitID;
            unit.organizationID = this.currentUnit.organizationID;
        }
        unit.name = this.f.name.value;
        unit.type = this.f.type.value;
        this.unitService.save(unit)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(data => {
                if (data) {
                    this.loading = false;
                    this.confirmCallback.emit({ isNew: this.isNew, unit: data });
                    this.hideModel();
                }
            });
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
