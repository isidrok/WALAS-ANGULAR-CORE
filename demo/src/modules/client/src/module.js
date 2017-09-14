import {NgModule, RouterModule, WalasAngularCoreModule} from '@walas/angular-core';
import {DemoClient} from './democlient';

@NgModule({
    imports: [
        WalasAngularCoreModule,
        RouterModule.forChild([
            {path: '', component: DemoClient}
        ])
    ],
    declarations: [
        DemoClient
    ]
})
export class ClientModule {}