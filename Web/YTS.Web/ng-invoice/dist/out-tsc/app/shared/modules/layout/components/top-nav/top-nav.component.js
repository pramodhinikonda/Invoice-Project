import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
var TopNavComponent = /** @class */ (function () {
    function TopNavComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    TopNavComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    TopNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-top-nav',
            templateUrl: './top-nav.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            AuthenticationService])
    ], TopNavComponent);
    return TopNavComponent;
}());
export { TopNavComponent };
//# sourceMappingURL=top-nav.component.js.map