import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var ExceptionHandlerComponent = /** @class */ (function () {
    function ExceptionHandlerComponent(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.hasError = false;
    }
    ExceptionHandlerComponent.prototype.ngOnInit = function () {
        this.hasError = this.activatedRoute.snapshot.queryParams['hasError'];
        this.data = this.activatedRoute.snapshot.data;
    };
    ExceptionHandlerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-exception-handler',
            templateUrl: './exception-handler.component.html',
            styleUrls: ['./exception-handler.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], ExceptionHandlerComponent);
    return ExceptionHandlerComponent;
}());
export { ExceptionHandlerComponent };
//# sourceMappingURL=exception-handler.component.js.map