import {NgModuleFactoryLoader} from '@walas/angular-vendor';
import {AfModuleLoader} from './afmoduleloader';

/**
 * ModuleLoaderProvider to use in the NgModule
 * providers property. Will make it use the
 * AfModuleLoader as the default FactoryLoader.
 */
export const AfModuleLoaderProvider = {
    provide: NgModuleFactoryLoader,
    useClass: AfModuleLoader
};