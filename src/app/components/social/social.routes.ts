import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SocialComponent} from './../social/social.component';

const routes: Routes = [
    {
        path: 'social',
        component: SocialComponent,
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
export class SocialRoutes {}
