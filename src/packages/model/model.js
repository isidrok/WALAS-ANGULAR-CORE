import {Directive, Input, ViewContainerRef} from '@walas/angular-vendor';
import {ModelService} from './modelservice';

/**
 * Directive to automatically build the model specified as input.
 * @Example: model="person.profile.name" will create the neccesarry
 *           properties inside person in order to get this final structure:
 *              ParentComponent: {
 *                  person: {
 *                      profile: {
 *                         
 *                      }
 *                  }
 *              }
 * It will also create references in the host component to the
 * target (person.profile) prop (name) and will make up a name
 * to use in form controls replacing the dots by underscores
 * (person_profile_name).
 * 
 * TODO: support for not nested model??
 * 
 * It will also set the root or parent model to the modelService
 * for validation purposes.
 * 
 * @WARNING: in order to achieve this some private properties
 * of ViewContainerRef are being used (_data and _view). 
 * 
 * @export
 * @class Model
 */
@Directive({
    selector: '[model]',
    providers: [ModelService]
})
export class Model {
    @Input() model = null;
    constructor(vcRef: ViewContainerRef, modelService: ModelService) {
        this._vcRef = vcRef;
        this._modelService = modelService;
        this._path = null;
    }
    ngOnInit() {
        this._path = this._transformModelToPath();
        this._setComponentAttrs();
        this._setModelServiceModel();
    }
    _transformModelToPath() {
        if (!this.model) {
            this._throwModelError(
                'No value was given for the model.'
            );
        }
        let path = this.model.split('.');
        /**
         * TODO: support for not nested model??
         */
        if (path.length === 1) {
            this._throwModelError(
                'Cannot write directly into the model, a property must be specified.'
            );
        }
        return path;
    }
    _setComponentAttrs() {
        let component = this._getComponent();
        component.prop = this._getProp();
        component.target = this._getTarget();
        component.name = this._getName();
    }
    _getProp() {
        /**
         *  Don't use Array.pop() in order to avoid
         *  side effects.
         */
        return this._path[this._path.length - 1];
    }
    _getTarget() {
        let pathBetweenParentAndProp = this._path.slice(
            1,
            this._path.length - 1
        );
        return pathBetweenParentAndProp.reduce((pre, cur) => {
            pre[cur] = pre[cur] || {};
            return pre[cur];
        }, this._getParentModel());
    }
    _getParentModel() {
        let parentModelKey = this._path[0];
        let parentComponent = this._getParentComponent();
        let parentModel = (
            parentComponent[parentModelKey] = parentComponent[parentModelKey] || {}
        );
        if (typeof parentModel !== 'object') {
            this._throwModelError(
                'The base model must be of type object.'
            );
        }
        return parentModel;
    }
    _getName() {
        return this.model.replace(/\./g, '_');
    }
    _setModelServiceModel() {
        this._modelService.model = this._getParentModel();
    }
    _getComponent() {
        /**
         * WARNING: this is a workaround to access the angular component
         * in which this directive is being used, in the future there may be
         * a better method or this one may stop working.
         */
        return this._vcRef._data.componentView.component;
    }
    _getParentComponent() {
        /**
         * WARNING: this is a workaround to access the angular component
         * that contains the one in which this directive is being used,
         * in the future there may be a better method or this one may stop working.
         */
        return this._vcRef._view.component;
    }
    _throwModelError(msg) {
        const exceptionLocation =
            `component: ${this._getComponent().constructor.name} inside: ${this._getParentComponent().constructor.name}`;
        throw new Error(`${msg} At ${exceptionLocation}`);
    }
}