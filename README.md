# WALAS-ANGULAR-CORE
Core elements for integration with Angular 4

## Table of Content

__TODO__

## API 

### configService

```js
import {configService} from '@walas/angular-core';
```

* ```init(customConfig)```: will load your custom configuration object into the config service, the object must be of type:
```js
    const myConfig = {
        i18n: i18nConfig,
        validation: {
            validatorLibrary: validatorjs,
            customValidators: myCustomValidators,
            validations: myValidations
        },
        loader: {
            routes: myRoutes,
            namespace: 'DEMO'
        }
    };
```
* ```checkIsInitialized(errorMsg)```: checks if the config is initialized and throws an if it is not throws an error whose message is errorMsg or             _'The configuration service must be initialized before declaring the main module.'_
* ```addRoutes(routes)```: __TODO__
* ```addValidators(validators)```: __TODO__
* ```addValidations(validations)```: __TODO__

#### Value accesors and default properties:

##### i18n
```js
const i18nDefaults = {
    useI18n: true,
    i18nLibrary: {}
};
```

##### loader
```js
const loaderDefaults = {
    namespace: 'WALAS',
    routes: []
};
```

#### validation
```js
const validationDefaults = {
    modelKeyword: '$model',
    defaultValidationError: 'Validation Error!',
    validatorLibrary: {},
    customValidators: {},
    validators: {}, // will contain the result of merging validatorLibrary and customValidators
    validations: {},
};
```

### form

#### AfForm

_@Component_

Wrapper for ```<form></form>``` element. __TODO__

```html
   <af-form>
        <af-input type="text" model="foo.email" rule="foo.email"/>
        <af-input type="password" model="foo.password" rule="foo.password"/>   
        <button type="submit">Submit</button>
    </af-form>
```

#### FormService

_@Injectable_

Stores a form and registers formControls programatically into it. Is scoped to each indiviual ```AfForm```.

* ```addControl(control, name)```: assigns the ```name``` to the ```control``` object and stores it.
* ```set form(value)```: called by ```AfForm``` to register its inner form into the form service and assign all stored controls to the that form.
* ```dispose()```: called by ```AfForm``` in ```ngOnDestroy```, empties that instance of the ```FormService```.

Controls must be added from your component
```js
// mycomponent.js
import {Component,ViewChild FormService} from '@walas/angular-core';

@Component({
    selector:'my-component',
    template: `
        <input type="text"  #control=ngModel [ngModel]="getProp(target,prop)" (ngModelChange)="setProp(target,prop,$event)/>
    `
}) // ngModel is explained under Model section
export class MyComponent {
    @ViewChild('control') control;
    name = null; // will be set by the model directive
    constructor(formService: FormService) {
        this._formService = formService;
    }
    ngAfterViewInit() {
        this._formService.addControl(this.control, this.name);
    }
}
```

### Loader

#### AfModuleLoader

_@Injectable_
Loader used for lazy loading and compiling Angular modules using ```<script></script>``` elements to fetch the source.

Given a routeObject of the type:
```js
    {
        route: 'bills',
        modulePath: 'http://localhost:8081/dist/demo_bill.umd.js',
        moduleName: 'BillModule',
        dependencies: [
            {
                modulePath: 'http://localhost:8082/dist/demo_client.umd.js',
                moduleName: 'ClientModule'
            },
            {
                modulePath: 'http://localhost:8083/dist/demo_payments.umd.js',
                moduleName: 'PaymentsModule'
            }
        ]
    }
```
transformed into a string using ```JSON.stringify``` (since Angular load() method must recieve an string). Transforms the string back into an object and loads the module with ```moduleName``` from the ```modulePath```. If there where ```dependencies``` those would be loaded first.

The ```module``` must be configured so it is in ```umd``` or ```iife``` format and available in the same ```namespace``` specified in the ```configurationService``` and must be the unique and ```default export```.

```js
// rollup.config.js
export default {
    // ...
    entry: 'src/index.js',
    format: 'umd' || 'iife',
    moduleName: '${NAMESPACE}.BillModule'
    // ...
};

// src/index.js
import {BillModule} from './module';
export default BillModule;
```

#### AfModuleLoaderProvider

Provider to use in the ```NgModule```, will tell Angular to use ```AfModuleLoader``` as ```NgModuleFactoryLoader```

```js
// mymodule.js
import {AfModuleLoaderProvider} from '@walas/angular-core';

@NgModule({
    // ...
    providers:[
        // ...
        AfModuleLoaderProvider
    ]
})
export class MyModule {}
```

#### resolveRoutes

Function that given an array of routeObjects like the seen above returns an object of the type
```js
{
    path: routeObject.route,
    loadChildren: JSON.stringify(routeObject)
}
```
This routes will later be used by our loader to lazy-load Angular modules. Use it to define the routes of your main Angular Module.
```js
// mymodule.js
import {AfModuleLoaderProvider, resolveRoutes, configService, RouterModule} from '@walas/angular-core';

const defaultRoutes = [
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    // ...
    imports: [
        // ...
        RouterModule.forRoot([
            ...resolveRoutes(configService.routes),
            ...defaultRoutes
        ])
    ]
    providers:[
        // ...
        AfModuleLoaderProvider
    ]
})
export class MyModule {}
```

### Model

#### model

_@Directive_

Replacement for ngModel that will generate the model automatically if there as nested objects
and pass it to the parent and child component by reference.

```html
<af-form>
    <af-input model="person.profile.name"></af-input>
</af-form>
```
will generate:
```js
afForm : {
    person:{
        profile:{
            name: undefined
        }
    }
    // ...
}

afInput: {
    target: person.profile,
    prop: 'name', 
    name: 'person_profile_name'
}
```
* ```target```: to be used in the ngModel of the inner input for getting/setting the ngModel.
* ```prop```: to access the value of the final property(name) from target.
* ```name```: name for the form control elements.

For more information see How to wrap elements.

#### ModelService

_@Injectable_

Used to store a model object and share it between components and the rule directive for validations. It is scoped to the model directive.

### Rule

_@Directive_

Validation directive, providing for ```NG_VALIDATORS```. Will read the validation rules from ```configService.validations``` and use the validation functions from ```configService.validators```.

```html
<af-form>
    <af-input model="person.email" rule="person.email"></af-input>
</af-form>
```

The value of ```rule``` must correspond with a property of ```configService.validations``` object such as:

```js
{
    person: {
        summary: [
        ],
        email: [
            {
                isEmail: {
                    message: 'must be a valid email'
                }
            },
            {
                contains: {
                    message: 'must contain .es',
                    arguments: [
                        '.es',
                    ]
                }
            },
            {
                emailDifferentFromPassword: {
                    message: 'email must be different from password',
                    arguments: [
                        '$model'
                    ]
                }
            }
        ]
    }
```

* The object must be of type ```entity: {field: [{validationRules}]```
* ```summary``` is used for global form validations.
* ```message``` will be availabe from the ```formControl``` if there is an error.
* ```arguments``` specifies the arguments to pass to the validation function (the first will be always the field value).

A ```setValidity``` input is available for changing the native valid attribute of html elements.

#### Defining custom validators and modelkeyword

Custom validators or validation functions must return ```true``` if they are correct and ```false``` otherwise:

```js
 const emailDifferentFromPassword = function(email) {
            return email !== this.password;
        }
```

Moreover if specifying ```$model``` or the ```modelKeyword``` specified in the ```configService``` the whole model will be available inside the function (notice the use of ```this.password```).

To add customValidators set them inside the initial configuration for calling ```configService.init(myConfig)```:
```js
const myCustomValidators = {
        emailDifferentFromPassword: function(email) {
            return email !== this.password;
        }
};
const myConfig = {
    // ...
    validation: {
        customValidators: myCustomValidators
    }
};
configService.init(myConfig);
```

Or through the ```addValidators``` API:
```js
import {configService} from '@walas/angular-core';

configService.addValidators(myCustomValidators);
```

The same approach must be followed for adding the validations (inside ```myConfig.validations``` or usin ```configService.addValidations()```).

For more information see Wrapping a component.

## Wrapping a component

__TODO__

## Demo Tour

__TODO__
