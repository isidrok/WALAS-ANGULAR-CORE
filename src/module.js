import {NgModule, FormsModule, BrowserModule} from '@walas/angular-vendor';
import {AfForm, Model, Rule} from './packages';

const ALL = [
    Rule,
    Model,
    AfForm,
];

@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: ALL,
    declarations: ALL,
})
export class WalasAngularCoreModule {}
