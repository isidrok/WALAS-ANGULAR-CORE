import {
    Directive,
    forwardRef,
    Input,
    NG_VALIDATORS,
    Validators
} from '@walas/angular-vendor';
import {ModelService} from '../model';
import {configService} from '../config';

const VALIDATORS_PROVIDER = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => Rule),
    multi: true
};

/**
 * Directive that given a path of the form 'entity.field'
 * finds its asociated validations in the configService and
 * using the validators obtained from that same service
 * creates angular validator functions.
 * 
 * It will act as a provider for NG_VALIDATORS.
 * 
 * setValidity can be passed as input in order to 
 * modify the native valid attribute of html inputs.
 * 
 * @export
 * @class Rule
 */
@Directive({
    selector: '[rule][ngModel]',
    providers: [
        VALIDATORS_PROVIDER
    ]
})
export class Rule {
    @Input('rule') path = null;
    @Input() setValidity = null;
    constructor(modelService: ModelService) {
        this._modelService = modelService;
    }
    ngOnInit() {
        if (!this.path) {
            // Prevent breack due to not yet initialized path.
            return;
        }
        this.validationFunctions = this._getValidationFunctions();
    }
    validate(control) {
        if (!this.path) {
            // Prevent breack due to not yet initialized path.            
            return;
        }
        let errors = Validators.compose(this.validationFunctions)(control);
        this.setValidity(!errors);
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
            msg: validation.message || configService.getDefaultValidationError(),
            fromModel: allArgs.includes(MODEL_KEYWORD)
        };
    }
    _getValidatonName(validationObj) {
        return Object.keys(validationObj)[0];
    }
}

