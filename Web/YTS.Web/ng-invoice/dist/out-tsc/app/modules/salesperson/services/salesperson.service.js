import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
var SalesPersonService = /** @class */ (function () {
    function SalesPersonService(http) {
        this.http = http;
        this.serviceName = 'SalesPerson';
        this.baseURL = environment.apiEndpoint + this.serviceName + '/';
    }
    SalesPersonService.prototype.getSalesPersons = function () {
        return this.http.get(this.baseURL + 'GetSalesPersons');
    };
    SalesPersonService.prototype.save = function (salesperson) {
        return this.http.post(this.baseURL + 'Save', salesperson);
    };
    SalesPersonService.prototype.delete = function (salespersonID) {
        return this.http.delete(this.baseURL + 'Delete?salespersonID=' + salespersonID);
    };
    SalesPersonService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SalesPersonService);
    return SalesPersonService;
}());
export { SalesPersonService };
//# sourceMappingURL=salesperson.service.js.map