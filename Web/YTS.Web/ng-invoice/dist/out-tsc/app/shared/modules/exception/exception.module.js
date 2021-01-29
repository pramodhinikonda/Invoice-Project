import * as tslib_1 from "tslib";
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExceptionHandler } from './handler/app.exception.handler';
import { ExceptionService } from './exception.service';
import { ExceptionRoutingModule } from './exception-routing.module';
import { ExceptionHandlerComponent } from './components/exception-handler/exception-handler.component';
var ExceptionModule = /** @class */ (function () {
    function ExceptionModule() {
    }
    ExceptionModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                ExceptionRoutingModule,
            ],
            declarations: [
                ExceptionHandlerComponent
            ],
            providers: [
                ExceptionService,
                {
                    provide: ErrorHandler,
                    useClass: ExceptionHandler,
                }
            ]
        })
    ], ExceptionModule);
    return ExceptionModule;
}());
export { ExceptionModule };
//# sourceMappingURL=exception.module.js.map