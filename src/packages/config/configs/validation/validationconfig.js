import {validationDefaults} from './validationdefaults';
export class ValidationConfig {
    constructor() {
        Object.assign(this, validationDefaults);
    }
    init() {
        this._mergeValidators();
    }
    get validations() {return this._validations;}
    set validations(value) {this._validations = value;}

    get validators() {return this._validators;}
    set validators(value) {this._validators = value;}

    get modelKeyword() {return this._modelKeyword;}
    set modelKeyword(value) {this._modelKeyword = value;}

    get defaultValidationError() {return this._defaultValidationError;}
    set defaultValidationError(value) {this._defaultValidationError = value;}

    get validatorLibrary() {return this._validatorLibrary;}
    set validatorLibrary(value) {this._validatorLibrary = value;}

    get customValidators() {return this._customValidators;}
    set customValidators(value) {this._customValidators = value;}

    _mergeValidators() {
        this.validators = {
            ...(this.customValidators),
            ...(this.validatorLibrary)
        };
    }
    addValidators(...validators) {
        // TODO
    }
    addValidations(...validations) {
        // TODO
    }
}