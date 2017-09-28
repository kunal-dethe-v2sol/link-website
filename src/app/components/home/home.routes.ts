import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
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
export class HomeRoutes {}
