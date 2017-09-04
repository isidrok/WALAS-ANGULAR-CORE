import {Component, ViewChild} from '@walas/angular-vendor';
import {FormService} from '../formservice';
import html from './afform.html';

/**
 * Wrapper for the <form> element, we need this in
 * order to programatically add form controls through
 * the FormService when not using the directive ngModel.
 * 
 * @export
 * @class AfForm
 */
@Component({
    selector: 'af-form',
    template: html,
    providers: [FormService]
})
export class AfForm {
    @ViewChild('frm') form;
    constructor(formService: FormService) {
        this._formService = formService;
    }
    ngAfterViewInit() {
        this._formService.form = this.form;
    }
    ngOnDestroy() {
        this._formService.dispose();
    }
    /**
     * TODO: 
     *  -> Add utility methods, such as isValid() to interact
     *     with the inner form.
     *  -> Submit system.
     */
}