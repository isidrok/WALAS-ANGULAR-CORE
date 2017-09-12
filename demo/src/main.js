import {platformBrowserDynamic, enableProdMode} from '@walas/angular-core';
import {DemoModule} from './app';

enableProdMode();
platformBrowserDynamic().bootstrapModule(DemoModule);