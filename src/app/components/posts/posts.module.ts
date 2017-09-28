import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PostsRoutes} from './posts.routes';
//import { PostsListComponent } from './list/posts-list.component';

@NgModule({
    declarations: [
        //    PostsListComponent
    ],
    imports: [
        CommonModule,
        PostsRoutes
    ],
    providers: []
})
export class PostsModule {}
