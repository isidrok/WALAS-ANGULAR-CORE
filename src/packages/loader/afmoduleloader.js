import {Injectable, Compiler} from '@walas/angular-vendor';
import {configService} from '../config';

/**
 * Custom loader to lazy load modules via scripts. Routes
 * must be specified using the following pattern:
 *  
 * TODO: improve docs
 *  
 * @export
 * @class AfModuleLoader
 */
@Injectable()
export class AfModuleLoader {
    constructor(compiler: Compiler) {
        this._compiler = compiler;
        // this._promisesCache = [];
    }
    load(path) {
        this._emptyPromiseCache();
        const {modulePath, moduleName, dependencies} = JSON.parse(path);
        const namespace = configService.namespace;
        return this._createPromise(moduleName, modulePath, namespace);
        /*
        dependencies && dependencies.filter((dependency) =>
            this._isModuleMissing(dependency.moduleName, namespace)
        ).map((dependency) => {
            this._promisesCache.push(
                this._createPromise(
                    dependency.moduleName,
                    dependency.modulePath,
                    namespace
                ));
        });
        this._promisesCache.push(
            this._createPromise(
                moduleName,
                modulePath,
                namespace
            ));
        return Promise.all(this._promisesCache)
            .then((ngFactoryModules) => ngFactoryModules)
            .catch((error) => {
                throw error;
            });
        */
    }
    _createPromise(moduleName, modulePath, namespace) {
        return new Promise((resolve, reject) => {
            let loadedModule = this._getModule(moduleName, namespace);
            if (loadedModule) {
                resolve(loadedModule);
            }
            let script = document.createElement('script');
            script.src = modulePath;
            script.onload = () => {
                loadedModule = this._getModule(moduleName, namespace);
                if (!loadedModule) {
                    reject(`${moduleName} could not be found although ${modulePath} was correctly loaded`);
                }
                this._compiler.compileModuleAsync(loadedModule)
                    .then((ngModule) => {
                        script.remove();
                        resolve(ngModule);
                    }).catch((error) => {
                        reject(error);
                    });
            };
            script.onerror = (error) => {
                reject(`Could not load ${path}`);
            };
            document.head.appendChild(script);
        });
    }
    _emptyPromiseCache() {
        this._promisesCache = [];
    }
    _getModule(moduleName, namespace) {
        return window && window[namespace] && window[namespace][moduleName];
    }
    _isModuleMissing(moduleName, namespace) {
        return !this._getModule(moduleName, namespace);
    }
}

