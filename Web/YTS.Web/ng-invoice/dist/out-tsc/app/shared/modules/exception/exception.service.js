import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { Router, NavigationError } from '@angular/router';
import { of } from 'rxjs';
var ExceptionService = /** @class */ (function () {
    function ExceptionService(injector, router) {
        var _this = this;
        this.injector = injector;
        this.router = router;
        // Subscribe to the NavigationError
        this.router
            .events
            .subscribe(function (event) {
            if (event instanceof NavigationError) {
                // Redirect to the ErrorComponent
                _this.log(event.error)
                    .subscribe(function (errorWithContext) {
                    _this.router.navigate(['/exception'], { queryParams: errorWithContext });
                });
            }
        });
    }
    ExceptionService.prototype.log = function (error) {
        console.error(error);
        return of(error);
    };
    ExceptionService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Injector,
            Router])
    ], ExceptionService);
    return ExceptionService;
}());
export { ExceptionService };
//# sourceMappingURL=exception.service.js.map