import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignUpComponent} from './signup.component';

const routes: Routes = [
    {
        path: 'signup',
        component: SignUpComponent,
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
export class SignUpRoutes {}
