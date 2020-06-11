import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var CellRendererComponent = /** @class */ (function () {
    function CellRendererComponent() {
    }
    CellRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        if (!params.action) {
            throw new Error('Missing action parameter for CellRendererComponent');
        }
    };
    CellRendererComponent.prototype.onClick = function () {
        this.params.action(this.params);
    };
    CellRendererComponent = tslib_1.__decorate([
        Component({
            selector: 'cu-download-link-cell-renderer',
            template: "\n  <div class=\"text-center\">\n    <i class=\"fa {{params.icon}}\" (click)=\"onClick()\" aria-hidden=\"true\"></i>\n  </div>"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CellRendererComponent);
    return CellRendererComponent;
}());
export { CellRendererComponent };
//# sourceMappingURL=cell-renderer.component.js.map