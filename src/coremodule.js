import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
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
export class Core {}
