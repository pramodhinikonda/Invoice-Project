import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
var ProfileService = /** @class */ (function () {
    function ProfileService(http) {
        this.http = http;
        this.userServiceName = 'User';
        this.orgServiceName = 'Organization';
        this.userBaseURL = environment.apiEndpoint + this.userServiceName + '/';
        this.orgBaseURL = environment.apiEndpoint + this.orgServiceName + '/';
    }
    ProfileService.prototype.getByEmail = function (email) {
        return this.http.get(this.userBaseURL + 'GetByEmail?email=' + email);
    };
    ProfileService.prototype.getOrganizations = function (userID) {
        return this.http.get(this.orgBaseURL + 'GetOrganizations?userID=' + userID);
    };
    ProfileService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ProfileService);
    return ProfileService;
}());
export { ProfileService };
//# sourceMappingURL=profile.service.js.map