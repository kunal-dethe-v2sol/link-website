import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password.component';

const routes: Routes = [
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        //        canActivate: []
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ForgotPasswordRoutes {}
