import {Injectable} from '@walas/angular-vendor';
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
