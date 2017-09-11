import {Injectable} from '@walas/angular-vendor';

/**
 * Adds form controls to a form so Angular can
 * validate it, used when there is no ngModel
 * in the input element.
 * Must be scoped to angular AFForm component. 
 * 
 * @export
 * @class FormService
 */
@Injectable()
export class FormService {
    constructor() {
        this._form = null;
        this._controls = [];
    }
    set form(value) {
        this._form = value;
        /**
        * Since form inner elements render before the form itself
        * controls will be added beforehand, therefore we can
        * add the controls when setting the form.
        */
        this._form && this._controls.forEach((c) => this._form.addControl(c));
    }
    addControl(control, name) {
        control && name && this._controls.push(
            Object.assign(control, {name})
        );
    }
    dispose() {
        this._controls = [];
        this._form = null;
    }
}