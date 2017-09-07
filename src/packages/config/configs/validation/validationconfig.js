import {validationDefaults} from './validationdefaults';
export class ValidationConfig {
    constructor() {
        Object.assign(this, validationDefaults);
    }
    init() {
        this._mergeValidators();
    }
    get validations() {
        return this._validations;
    }
    set validations(value) {
        this._validations = value;
    }
    get validators() {
        return this._validators;
    }
    set validators(value) {
        this._validators = value;
    }
    get modelKeyword() {
        return this._modelKeyword;
    }
    set modelKeyword(value) {
        this._modelKeyword = value;
    }
    _mergeValidators() {
        this.validators = {
            ...(this.customValidators),
            ...(this.validatorsLibrary)
        };
    }
    addValidators(...validators) {
        // TODO
    }
    addValidations(...validations) {
        // TODO
    }
}