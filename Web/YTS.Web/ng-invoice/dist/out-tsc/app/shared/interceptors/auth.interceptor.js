import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../modules/layout/services/authentication.service';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    AuthInterceptor.prototype.intercept = function (request, next) {
        var user = this.authenticationService.getAuth();
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/javascript, text/html',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'User': user
            }
        });
        return next.handle(request);
    };
    AuthInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map