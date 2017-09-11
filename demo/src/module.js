import {NgModule, WalasAngularCoreModule, FormsModule} from '@walas/angular-core';
import {DemoApp} from './demoapp';
import {DemoInput} from './demoinput';

@NgModule({
    imports: [
        FormsModule,
        WalasAngularCoreModule
    ],
    declarations: [
        DemoApp,
        DemoInput
    ],
    bootstrap: [
        DemoApp
    ]
})
export class DemoModule {}