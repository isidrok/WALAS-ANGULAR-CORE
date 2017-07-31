import {Injectable} from '@walas/angular-vendor';
@Injectable()
export class FormService {
    constructor() {
        this._form = null;
        this._controls = [];
    }
    set form(value) {
        this._form = value;
        this._form && this._controls.forEach((c) => this._form.addControl(c));
    }
    addControl(name, control) {
        name && control && this._controls.push(Object.assign(control, {name}));
    }
    dispose() {
        this._controls = [];
        this._form = null;
    }
}