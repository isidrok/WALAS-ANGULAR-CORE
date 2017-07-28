import {Injectable, Compiler} from '@angular/core';

const SEPARATOR = '#';

// TODO pass a route object instead of path to load dependencies
@Injectable()
export class AfModuleFactoryLoader {
    constructor(compiler: Compiler) {
        this.compiler = compiler;
    }
    load(path) {
        let {modulePath, moduleName} = this.splitPath(path);
        return new Promise((resolve, reject) => {
            let loadedModule = window[NAMESPACE] && window[NAMESPACE][moduleName];
            if (loadedModule) {
                resolve(loadedModule);
            }
            let script = document.createElement('script');
            script.src = modulePath;
            script.onload = () => {
                this.compiler.compileModuleAsync(window[NAMESPACE][moduleName]).then((ngModule) => {
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
    splitPath(path) {
        let [modulePath, moduleName] = path.split(SEPARATOR);
        return {modulePath, moduleName};
    }
}

