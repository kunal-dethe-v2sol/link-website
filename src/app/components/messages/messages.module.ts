import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//import { Ng2MDFValidationMessagesModule } from 'ng2-mdf-validation-messages';

import { MessagesRoutes } from './messages.routes';

import { ThreadListComponent } from './thread-list/thread-list.component';
import { NewThreadComponent } from './new-thread/new-thread.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadAddUserComponent } from './thread-add-user/thread-add-user.component';

import { ThreadsService } from './threads.service';


@NgModule({
    declarations: [
        ThreadListComponent,
        NewThreadComponent,
        ThreadsComponent,
        ThreadAddUserComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        Ng2UploaderModule,
        MessagesRoutes,
        BootstrapModalModule,
        //Ng2MDFValidationMessagesModule,
    ],
    entryComponents: [
        ThreadAddUserComponent
      ],
    bootstrap: [ThreadsComponent],
    providers: [
        ThreadsService,
    ],
})
export class MessagesModule { }
