import {Component, ViewChild} from '@walas/angular-core';

@Component({
    selector: 'demo-app',
    template: `
    <af-form #frm [onSubmit]="onSubmit">
        <demo-input model="model.email" rule="foo.email" text="email"></demo-input>       
        <demo-input model="model.password" text="password"></demo-input>   
        <button type="submit">Submit</button>
    </af-form>
    <a routerLink="/bills">
        Show Bills
    </a>
    <a routerLink="/clients">
        Show Clients
    </a>
    <router-outlet></router-outlet>    
    `
})
export class DemoApp {
    @ViewChild('frm') form;
    onSubmit = () => {
        console.log(this);
    }
}

// TODO: when changing the password email wont be validated again
// although the validation depends on both inputs, but since the control
// is only in email, password changes won't trigger it.