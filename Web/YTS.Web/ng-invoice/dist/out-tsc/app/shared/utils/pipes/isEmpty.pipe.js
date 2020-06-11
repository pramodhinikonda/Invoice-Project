import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var IsEmptyPipe = /** @class */ (function () {
    function IsEmptyPipe() {
    }
    IsEmptyPipe.prototype.transform = function (value, fallback) {
        var processedValue = '';
        if (value) {
            processedValue = value;
        }
        else {
            processedValue = fallback;
        }
        return processedValue;
    };
    IsEmptyPipe = tslib_1.__decorate([
        Pipe({ name: 'isEmpty' })
    ], IsEmptyPipe);
    return IsEmptyPipe;
}());
export { IsEmptyPipe };
//# sourceMappingURL=isEmpty.pipe.js.map