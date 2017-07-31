import {NgModuleFactoryLoader} from '@walas/angular-vendor';
import {AfLoader} from './afloader';

export const AfLoaderProvider = {
    provide: NgModuleFactoryLoader,
    useClass: AfLoader
};