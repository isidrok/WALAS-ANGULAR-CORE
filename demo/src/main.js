import {platformBrowserDynamic, enableProdMode, configService} from '@walas/angular-core';
import {myConfig} from './config';
import {DemoModule} from './module';

configService.init(myConfig);
enableProdMode();
platformBrowserDynamic().bootstrapModule(DemoModule);