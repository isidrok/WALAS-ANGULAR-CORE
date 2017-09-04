import {Injectable} from '@walas/angular-vendor';

/**
 * Service so the validations of a given model
 * can access all of its properties.
 * 
 * @export
 * @class ModelService
 */
@Injectable()
export class ModelService {
    constructor() {
        this._model = null;
    }
    set model(value) {
        this._model = value;
    }
    get model() {
        return this._model;
    }
}
