import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import { ArticlesListComponent } from './list/articles-list.component';  

const routes: Routes = [
    //  { path: 'articles', component: ArticlesListComponent },
    //  { path: 'articles/create', component: ArticlesCreateComponent },
    //  { path: 'articles/update', component: ArticlesUpdateComponent },
    //  { path: 'articles/delete', component: ArticlesDeleteComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticlesRoutes {}
