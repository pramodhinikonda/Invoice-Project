import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ExceptionService } from '../exception.service';
var ExceptionHandler = /** @class */ (function () {
    function ExceptionHandler(injector) {
        this.injector = injector;
    }
    ExceptionHandler.prototype.handleError = function (error) {
        var errorsService = this.injector.get(ExceptionService);
        var router = this.injector.get(Router);
        // Client Error Happend
        errorsService
            .log(error)
            .subscribe(function (errorWithContextInfo) {
            router.navigate(['/exception'], { queryParams: { hasError: true } });
        });
    };
    ExceptionHandler = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Injector])
    ], ExceptionHandler);
    return ExceptionHandler;
}());
export { ExceptionHandler };
//# sourceMappingURL=app.exception.handler.js.map