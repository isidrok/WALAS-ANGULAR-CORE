import {
    NgModule, WalasAngularCoreModule, FormsModule,
    RouterModule, AfModuleLoaderProvider, resolveRoutes,
    configService, BrowserModule
} from '@walas/angular-core';
import {DemoApp} from './demoapp';
import {DemoInput} from './demoinput';

const defaultRoutes = [
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        WalasAngularCoreModule,
        RouterModule.forRoot([
            ...resolveRoutes(configService.routes),
            ...defaultRoutes
        ], {useHash: true})
    ],
    declarations: [
        DemoApp,
        DemoInput
    ],
    providers: [
        AfModuleLoaderProvider
    ],
    bootstrap: [
        DemoApp
    ]
})
export class DemoModule {}