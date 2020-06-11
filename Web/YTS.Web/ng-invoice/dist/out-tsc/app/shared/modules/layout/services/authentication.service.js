import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { PersistanceService } from '../../../services/persistance.service';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, persistance, profileService) {
        this.http = http;
        this.persistance = persistance;
        this.profileService = profileService;
        this.userInfo = 'invoice:user';
        this.currentUserSubject = new BehaviorSubject(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    AuthenticationService.prototype.login = function (username, password) {
        //return this.http.post<UserStatus>(`${environment.apiEndpoint}Login`, { username, password })
        //  .pipe(map(user => {
        //    // login successful if there's a jwt token in the response
        //    if (user.UserDetails) {
        //      this.activateUser(user.UserDetails);
        //    }
        //    else // Need to Remove after login implementation
        //      this.activateUser({ Email: 'sivanraj@live.in', FullName: 'Sivanraj', ID: '1', IsEmailVerified: 'true', IsMobileVerified: 'true', Mobile: '9578044569', Password: '', RoleID: 'SuperUser', Status: '' });
        //    return user;
        //  }));
        this.activateUser({ Email: 'sivanraj@live.in', FullName: 'Sivanraj', ID: '1', IsEmailVerified: 'true', IsMobileVerified: 'true', Mobile: '9578044569', Password: '', RoleID: 'SuperUser', Status: '' });
    };
    AuthenticationService.prototype.activateUser = function (profile) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, organizations, organization;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!profile) return [3 /*break*/, 3];
                        this.currentUserSubject.next(profile);
                        return [4 /*yield*/, this.profileService.getByEmail(profile.Email).toPromise()];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.profileService.getOrganizations(user.userID).toPromise()];
                    case 2:
                        organizations = _a.sent();
                        if (organizations && organizations.length) {
                            organization = organizations.find(function (x) { return x.isDefaultOrganization === true; });
                            if (!organization)
                                organization = organizations[0];
                            this.setAuth(user, organization);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService.prototype.setAuth = function (user, organization) {
        var auth = {
            ClientID: user.clientID,
            UserID: user.userID,
            OrganizationID: organization.organizationID
        };
        this.persistance.set(this.userInfo, auth);
    };
    AuthenticationService.prototype.getAuth = function () {
        var token = '';
        var authData = this.persistance.get(this.userInfo);
        if (authData)
            token = btoa(JSON.stringify(authData));
        return token;
    };
    AuthenticationService.prototype.logout = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // Temp Code
                this.currentUserSubject.next(null);
                this.persistance.deleteAll([this.userInfo]);
                return [2 /*return*/];
            });
        });
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, PersistanceService, ProfileService])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map