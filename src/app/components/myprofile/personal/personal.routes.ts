import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PersonalComponent} from './personal.component';

const routes: Routes = [
    {
        path: 'personal',
        component: PersonalComponent,
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
export class PersonalRoutes {}
