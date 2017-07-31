import {Component, ViewChild, Input} from '@walas/angular-vendor';
import {FormService} from '../formservice';
import html from './afform.html';

@Component({
    selector: 'af-form',
    template: html,
    providers: [FormService]
})
export class AfForm {
    @Input() onSubmit;
    @ViewChild('frm') form;
    constructor(service: FormService) {
        this.service = service;
    }
    ngAfterViewInit() {
        this.service.form = this.form;
    }
    ngOnDestroy() {
        this.service.dispose();
        this.form = null;
    }
    isValid() {
        return this.form && this.form.valid;
    }
}