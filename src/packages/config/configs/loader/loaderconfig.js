import {loaderDefaults} from './loaderdefaults';
export class LoaderConfig {
    constructor() {
        Object.assign(this, loaderDefaults);
    }

    get namespace() {return this._namespace;}
    set namespace(value) {this._namespace = value;}

    get routes() {return this._routes;}
    set routes(value) {this._routes = value;}

    addRoutes(...routes){
        // TODO
    }
}