import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LoggerService } from '../modules/logger/logger.service';
var PersistanceService = /** @class */ (function () {
    function PersistanceService(logger) {
        this.logger = logger;
    }
    // Local Storage
    PersistanceService.prototype.set = function (key, data) {
        try {
            if (this.isLocalStorageAvailable)
                localStorage.setItem(key, JSON.stringify(data));
        }
        catch (e) {
            this.logger.error('Error saving to localStorage', e);
        }
    };
    PersistanceService.prototype.get = function (key) {
        try {
            if (this.isLocalStorageAvailable)
                return JSON.parse(localStorage.getItem(key));
        }
        catch (e) {
            this.logger.error('Error getting data from localStorage', e);
            return null;
        }
    };
    PersistanceService.prototype.delete = function (key) {
        try {
            if (this.isLocalStorageAvailable)
                localStorage.removeItem(key);
        }
        catch (e) {
            this.logger.error('Error getting data from localStorage', e);
            return null;
        }
    };
    PersistanceService.prototype.deleteAll = function (keys) {
        try {
            if (this.isLocalStorageAvailable) {
                keys.forEach(function (key) {
                    localStorage.removeItem(key);
                });
            }
        }
        catch (e) {
            this.logger.error('Error getting data from localStorage', e);
            return null;
        }
    };
    PersistanceService.prototype.clear = function () {
        try {
            if (this.isLocalStorageAvailable) {
                localStorage.clear();
            }
        }
        catch (e) {
            this.logger.error('Error getting data from localStorage', e);
            return null;
        }
    };
    PersistanceService.prototype.isLocalStorageAvailable = function () {
        if (window.localStorage)
            return true;
        else
            return false;
    };
    // Cookies
    PersistanceService.prototype.create = function (cookieName, cookieValue, minsToExpire) {
        var date = new Date();
        date.setTime(date.getTime() + (minsToExpire * 60 * 1000));
        document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toUTCString();
    };
    PersistanceService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [LoggerService])
    ], PersistanceService);
    return PersistanceService;
}());
export { PersistanceService };
//# sourceMappingURL=persistance.service.js.map