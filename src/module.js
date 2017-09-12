import {NgModule, FormsModule, CommonModule} from '@walas/angular-vendor';
import {AfForm, Model, Rule} from './packages';

const ALL = [
    Rule,
    Model,
    AfForm,
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: ALL,
    declarations: ALL,
})
export class WalasAngularCoreModule {}

// TODO: import commonModule instead of BrowserModule to not break lazy load