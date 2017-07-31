import {
    Directive,
    forwardRef,
    Input,
    NG_VALIDATORS,
    Validators
} from '@walas/angular-vendor';
import {ModelService} from '../model';
import {configService} from '../config';

@Directive({
    selector: '[rule][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => Rule),
            multi: true
        }
    ]
})
export class Rule {
    @Input('rule') path = null;
    @Input() setValidity = null;
    constructor(modelService: ModelService) {
        this._modelService = modelService;
    }
    ngOnInit() {
        if (!this.path) return;
        this.validationFunctions = this._getValidationFunctions();
    }
    validate(control) {
        if (!this.path) return;
        let errors = Validators.compose(this.validationFunctions)(control);
        let validity = errors ? false : true;
        this.setValidity(validity);
        return errors;
    }
    _getValidationFunctions() {
        return this._getValidations().map((validationObj) => {
            let {func, args, msg, fromModel} = this._getValidationParams(validationObj);
            return (control) => {
                let scope = fromModel ? this._modelService.model : {};
                let thisArgs = [control.value || ''].concat(args);
                return func.apply(scope, thisArgs) ? null : {[func.name]: msg};
            };
        });
    }
    _getValidations() {
        let keys = this.path.split('.');
        let entity = keys[0];
        let field = keys[1];
        return configService.getValidations()[entity][field];
    }
    _getValidationParams(validationObj) {
        let validationName = this._getValidatonName(validationObj);
        let validation = validationObj[validationName];
        let allArgs = validation.arguments || [];
        let validators = configService.getValidators();
        let MODEL_KEYWORD = configService.getModelKeyword();
        return {
            func: validators[validationName],
            args: allArgs.filter((c) => c !== MODEL_KEYWORD),
            msg: validation.message || 'Validation Error',
            fromModel: allArgs.includes(MODEL_KEYWORD)
        };
    }
    _getValidatonName(validationObj) {
        return Object.keys(validationObj)[0];
    }
}

