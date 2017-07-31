import {Directive, Input, ViewContainerRef} from '@walas/angular-vendor';
import {ModelService} from './modelservice';
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
        this._checkModelExists();
        this._checkModelIsObject();
        this._path = this._transformModelToPath();
        this._checkIsValidPath();
        this._setComponentAttrs();
        this._setModelServiceModel();
    }
    _transformModelToPath() {
        return this.model.split('.');
    }
    _setComponentAttrs() {
        let component = this._getComponent();
        component.prop = this._getProp();
        component.target = this._getTarget();
        component.name = this._getName();
    }
    _getProp() {
        return this._path.pop();
    }
    _getTarget() {
        return this._path.slice(1).reduce((pre, cur) => {
            pre[cur] = pre[cur] || {};
            return pre[cur];
        }, this._getParentModel());
    }
    _getParentModel() {
        let parentModel = this.model.substring(0, this.model.indexOf('.'));
        let parentComponent = this._getParentComponent();
        return (parentComponent[parentModel] = parentComponent[parentModel] || {});
    }
    _getName() {
        return this.model.replace(/\./g, '_');
    }
    _setModelServiceModel() {
        this._modelService.model = this._getParentModel();
    }
    _getComponent() {
        return this._vcRef._data.componentView.component;
    }
    _getParentComponent() {
        return this._vcRef._view.component;
    }
    _checkModelExists() {
        if (!this.model) {
            throw new Error(
                `No value was given for the model.
                ${this._getExceptionLocation()}.`
            );
        }
    }
    _checkModelIsObject() {
        if (typeof this._getParentModel() !== 'object') {
            throw new Error(
                `The base model must be of type object.
                ${this._getExceptionLocation()}.`
            );
        }
    }
    _checkIsValidPath() {
        if (this._path.length === 1) {
            throw new Error(
                `Cannot write directly into the model, a property must be specified.
            ${this._getExceptionLocation()}.`
            );
        }
    }
    _getExceptionLocation() {
        return `At component: ${this._getComponent().constructor.name} inside: ${this._getParentComponent().constructor.name}`;
    }
}