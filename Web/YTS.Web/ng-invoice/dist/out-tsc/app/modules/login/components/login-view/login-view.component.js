import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../shared/modules/layout/services/authentication.service';
var LoginViewComponent = /** @class */ (function () {
    function LoginViewComponent(formBuilder, route, router, authenticationService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.error = '';
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        if (this.currentUser) {
            this.router.navigate(['/']);
        }
    }
    LoginViewComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginViewComponent.prototype, "form", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginViewComponent.prototype.onSubmit = function () {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.form.username.value, this.form.password.value);
        this.router.navigate([this.returnUrl]);
        //.pipe(first())
        //.subscribe(
        //  data => {
        //    this.router.navigate([this.returnUrl]);
        //  },
        //  error => {
        //    this.error = error;
        //    this.loading = false;
        //  });
    };
    LoginViewComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-view',
            templateUrl: './login-view.component.html',
            styleUrls: ['./login-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            AuthenticationService])
    ], LoginViewComponent);
    return LoginViewComponent;
}());
export { LoginViewComponent };
//# sourceMappingURL=login-view.component.js.map