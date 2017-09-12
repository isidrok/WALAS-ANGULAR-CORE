(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@walas/angular-core')) :
	typeof define === 'function' && define.amd ? define(['@walas/angular-core'], factory) :
	(global.DEMO = global.DEMO || {}, global.DEMO.BillModule = factory(global.WALAS.walasAngularCore));
}(this, (function (_walas_angularCore) { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _dec$1;
var _class$1;

var DemoBill = (_dec$1 = _walas_angularCore.Component({
    selector: 'demo-bill',
    template: '\n        <h1>\n            BILL MODULE\n        </h1>\n        <af-form>\n            <input type="text"/>\n        </af-form>\n        '
}), _dec$1(_class$1 = function DemoBill() {
    classCallCheck(this, DemoBill);
}) || _class$1);

var _dec;
var _class;

var BillModule$1 = (_dec = _walas_angularCore.NgModule({
    imports: [_walas_angularCore.WalasAngularCoreModule, _walas_angularCore.RouterModule.forChild([{ path: '', component: DemoBill }])],
    declarations: [DemoBill]
}), _dec(_class = function BillModule() {
    classCallCheck(this, BillModule);
}) || _class);

return BillModule$1;

})));
//# sourceMappingURL=demo_bill.umd.js.map
