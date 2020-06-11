import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(authenticationService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    AppComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map