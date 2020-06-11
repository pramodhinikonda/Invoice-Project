import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExceptionHandlerComponent } from './exception-handler.component';
describe('ErrorHandlerComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ExceptionHandlerComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ExceptionHandlerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create instance successfully', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=exception-handler.component.spec.js.map