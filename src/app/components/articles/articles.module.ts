import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ArticlesRoutes} from './articles.routes';
//import { ArticlesListComponent } from './list/articles-list.component';

@NgModule({
    declarations: [
        //    ArticlesListComponent
    ],
    imports: [
        CommonModule,
        ArticlesRoutes
    ],
    providers: []
})
export class ArticlesModule {}
