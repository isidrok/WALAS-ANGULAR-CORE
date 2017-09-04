import {Injectable, Compiler} from '@walas/angular-vendor';
import {configService} from '../config';

const SEPARATOR = '#';
/**
 * Custom loader to lazy load modules via scripts. Routes
 * must be specified using the following pattern:
 *  PathToModule#ModuleName
 * 
 * TODO: pass a route object instead of path to load dependencies
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
        const {modulePath, moduleName} = this._splitPath(path);
        const namespace = configService.getNamespace();
        return new Promise((resolve, reject) => {
            let loadedModule = this._getModule(namespace, moduleName);
            if (loadedModule) {
                resolve(loadedModule);
            }
            let script = document.createElement('script');
            script.src = modulePath;
            script.onload = () => {
                loadedModule = this._getModule(namespace, moduleName);
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
    _splitPath(path) {
        let [modulePath, moduleName] = path.split(SEPARATOR);
        return {modulePath, moduleName};
    }
    _getModule(namespace, moduleName) {
        return window && window[namespace] && window[namespace][moduleName];
    }
}

