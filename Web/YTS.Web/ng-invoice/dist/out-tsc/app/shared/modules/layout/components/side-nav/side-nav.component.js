import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(authenticationService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    SideNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-side-nav',
            templateUrl: './side-nav.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], SideNavComponent);
    return SideNavComponent;
}());
export { SideNavComponent };
//# sourceMappingURL=side-nav.component.js.map