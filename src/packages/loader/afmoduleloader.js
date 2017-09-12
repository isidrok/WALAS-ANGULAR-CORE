import {Injectable, Compiler} from '@walas/angular-vendor';
import {configService} from '../config';

const SEPARATOR = '#';
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
    }
    load(path) {
        const {modulePath, moduleName, dependencies} = JSON.parse(path);
        const namespace = configService.namespace;
        let missingDependencies = dependencies && dependencies
            .filter((dependency) =>
                this._isModuleMissing(dependency.moduleName, namespace)
            );
        if (missingDependencies && missingDependencies.length > 0) {
            // TODO: handle missing dependencies Promise.all???
        }
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
    _getModule(moduleName, namespace) {
        return window && window[namespace] && window[namespace][moduleName];
    }
    _isModuleMissing(moduleName, namespace) {
        return !this._getModule(moduleName, namespace);
    }
}

