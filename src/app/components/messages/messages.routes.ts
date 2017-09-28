import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ThreadsComponent } from './threads/threads.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { NewThreadComponent } from './new-thread/new-thread.component';
import {SharedCanActivateAuthService} from './../shared/service/shared-can-activate-auth.service';

const routes: Routes = [
    {
        path: 'messages',
        component: ThreadListComponent,
        canActivate: [SharedCanActivateAuthService],
        children: [
            /*{
                path: '',
                pathMatch: 'full',
                component: ThreadListComponent,
            },*/
            {
                path: 'threads/:uuid',
                component: ThreadsComponent,
            },
            {
                path: 'new',
                component: NewThreadComponent,
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class MessagesRoutes { }
