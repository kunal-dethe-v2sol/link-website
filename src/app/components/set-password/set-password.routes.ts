import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SetPasswordComponent} from './set-password.component';

const routes: Routes = [
    {
        path: 'set-password',
        component: SetPasswordComponent,
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
export class SetPasswordRoutes {}
