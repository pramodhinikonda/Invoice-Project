import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
var InvoiceService = /** @class */ (function () {
    function InvoiceService(http) {
        this.http = http;
        this.serviceName = 'Invoice';
        this.baseURL = environment.apiEndpoint + this.serviceName + '/';
    }
    InvoiceService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], InvoiceService);
    return InvoiceService;
}());
export { InvoiceService };
//# sourceMappingURL=invoice.service.js.map