import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
var UnitService = /** @class */ (function () {
    function UnitService(http) {
        this.http = http;
        this.serviceName = 'Unit';
        this.baseURL = environment.apiEndpoint + this.serviceName + '/';
    }
    UnitService.prototype.getUnits = function () {
        return this.http.get(this.baseURL + 'GetUnits');
    };
    UnitService.prototype.save = function (unit) {
        return this.http.post(this.baseURL + 'Save', unit);
    };
    UnitService.prototype.delete = function (unitID) {
        return this.http.delete(this.baseURL + 'Delete?unitID=' + unitID);
    };
    UnitService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UnitService);
    return UnitService;
}());
export { UnitService };
//# sourceMappingURL=unit.service.js.map