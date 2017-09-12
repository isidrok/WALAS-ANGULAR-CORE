import {NgModule, RouterModule, WalasAngularCoreModule} from '@walas/angular-core';
import {DemoBill} from './demobill';

@NgModule({
    imports: [
        WalasAngularCoreModule,
        RouterModule.forChild([
            {path: '', component: DemoBill}
        ])
    ],
    declarations: [
        DemoBill
    ]
})
export class BillModule {}