import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
var DataTableDirective = /** @class */ (function () {
    function DataTableDirective(el) {
        this.el = el;
        this.dtOptions = {};
    }
    DataTableDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dtTrigger) {
            this.dtTrigger.subscribe(function () {
                _this.displayTable();
            });
        }
        else {
            this.displayTable();
        }
    };
    DataTableDirective.prototype.ngOnDestroy = function () {
        if (this.dtTrigger) {
            this.dtTrigger.unsubscribe();
        }
        if (this.dt) {
            this.dt.destroy(true);
        }
    };
    DataTableDirective.prototype.displayTable = function () {
        var _this = this;
        this.dtInstance = new Promise(function (resolve, reject) {
            Promise.resolve(_this.dtOptions).then(function (dtOptions) {
                // Using setTimeout as a "hack" to be "part" of NgZone
                setTimeout(function () {
                    _this.dt = $(_this.el.nativeElement).DataTable(dtOptions);
                    resolve(_this.dt);
                });
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DataTableDirective.prototype, "dtOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Subject)
    ], DataTableDirective.prototype, "dtTrigger", void 0);
    DataTableDirective = tslib_1.__decorate([
        Directive({
            selector: '[datatable]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], DataTableDirective);
    return DataTableDirective;
}());
export { DataTableDirective };
//# sourceMappingURL=datatable.directive.js.map