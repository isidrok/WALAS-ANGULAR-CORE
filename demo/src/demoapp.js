import {Component, ViewChild} from '@walas/angular-core';

@Component({
    selector: 'demo-app',
    template: `
    <af-form #frm [onSubmit]="onSubmit">
        <demo-input model="model.email" rule="foo.email" text="email"></demo-input>       
        <demo-input model="model.password" text="password"></demo-input>   
        <button type="submit">Submit</button>
    </af-form>
    `
})
export class DemoApp {
    @ViewChild('frm') form;
    onSubmit = () => {
        console.log(this);
    }
}