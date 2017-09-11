import {Component, Input, ViewChild, FormService} from '@walas/angular-core';

@Component({
    selector: 'demo-input',
    template: `
        <div>
            <input #inputElement type="text" #control=ngModel [ngModel]="getProp(target,prop)" (ngModelChange)="setProp(target,prop,$event)"
                [attr.name]="name" [rule]="rule" [setValidity]="setValidity" />
            <label>{{text}}</label>
        </div>
    `
})
export class DemoInput {
    @Input() text = null;
    @Input() rule = null;
    @ViewChild('control') control;
    @ViewChild('inputElement') inputElement;
    target = null;
    prop = null;
    name = null;
    constructor(formService: FormService) {
        this._formService = formService;
    }
    getProp(target, prop) {
        return target[prop];
    }
    setProp(target, prop, value) {
        target[prop] = value;
    }
    setValidity = (valid) => {
        if (!this.control.dirty) return;
        let validity = valid ? '' : 'invalid';
        this.inputElement.nativeElement.setCustomValidity(validity);
    }
    ngAfterViewInit() {
        this._formService.addControl(this.control, this.name);
    }
}