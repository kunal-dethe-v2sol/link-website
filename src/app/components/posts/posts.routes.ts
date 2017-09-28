import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import { PostsListComponent } from './list/posts-list.component';  

const routes: Routes = [
    //  { path: 'posts', component: PostsListComponent },
    //  { path: 'posts/create', component: PostsCreateComponent },
    //  { path: 'posts/update', component: PostsUpdateComponent },
    //  { path: 'posts/delete', component: PostsDeleteComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PostsRoutes {}
