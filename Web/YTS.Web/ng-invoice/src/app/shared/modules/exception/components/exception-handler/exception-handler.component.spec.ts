import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExceptionHandlerComponent } from './exception-handler.component';

describe('ErrorHandlerComponent', () => {
    let component: ExceptionHandlerComponent;
    let fixture: ComponentFixture<ExceptionHandlerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ExceptionHandlerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExceptionHandlerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create instance successfully', () => {
        expect(component).toBeTruthy();
    });
});
