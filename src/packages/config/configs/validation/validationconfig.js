export class ValidationConfig {
    init() {
        this._mergeValidators();
    }
    getValidations() {
        return this._config.validations;
    }
    getValidators() {
        return this._config.validators;
    }
    getModelKeyword() {
        return this._config.modelKeyword;
    }
    _mergeValidators() {
        this._config.validators = {
            ...(this._config.customValidators),
            ...(this._config.validatorsLibrary)
        };
    }
    _addValidators(...validators) {
        this._config.validators = {
            ...(this._config.validators),
            ...(validators)
        };
    }
}