import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ExperienceComponent} from './experience.component';

const routes: Routes = [
    {
        path: 'experience',
        component: ExperienceComponent
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
export class ExperienceRoutes {}
