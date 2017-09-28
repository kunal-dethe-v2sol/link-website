import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PrimaryInfoComponent} from './primary-info.component';

const routes: Routes = [
    {
        path: 'primary-info',
        component: PrimaryInfoComponent,
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
export class PrimaryInfoRoutes {}
