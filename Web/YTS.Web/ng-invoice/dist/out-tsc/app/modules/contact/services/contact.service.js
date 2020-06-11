import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
var ContactService = /** @class */ (function () {
    function ContactService(http) {
        this.http = http;
        this.serviceName = 'Contact';
        this.baseURL = environment.apiEndpoint + this.serviceName + '/';
    }
    ContactService.prototype.getContacts = function () {
        return this.http.get(this.baseURL + 'GetContacts');
    };
    ContactService.prototype.save = function (contact) {
        return this.http.post(this.baseURL + 'Save', contact);
    };
    ContactService.prototype.delete = function (contactID) {
        return this.http.delete(this.baseURL + 'Delete?contactID=' + contactID);
    };
    ContactService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ContactService);
    return ContactService;
}());
export { ContactService };
//# sourceMappingURL=contact.service.js.map