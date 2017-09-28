import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2MDFValidationMessagesModule} from 'ng2-mdf-validation-messages';

import {GroupsRoutes} from './groups.routes';
import {GroupsComponent} from './groups.component';
import {GroupsNewComponent} from './new/groups-new.component';
import {GroupsListComponent} from './list/groups-list.component';
import {GroupsDetailComponent} from './detail/groups-detail.component';
import {GroupsDetailEditComponent} from './detail/edit/groups-detail-edit.component';
import {GroupsDetailDiscussionComponent} from './detail/discussion/groups-detail-discussion.component';
import {GroupsDetailMembersComponent} from './detail/members/groups-detail-members.component';
import {GroupsDetailAboutComponent} from './detail/about/groups-detail-about.component';
import {GroupsDetailManageComponent} from './detail/manage/groups-detail-manage.component';
import {GroupsDetailManageMemberRequestsComponent} from './detail/manage/member-requests/groups-detail-manage-member-requests.component';
import {GroupsDetailManageReportedPostsComponent} from './detail/manage/reported-posts/groups-detail-manage-reported-posts.component';

import {GroupsService} from './groups.service';
import {GroupsCanActivateService} from './groups-can-activate.service';
import {GroupsDetailResolver} from './detail/groups-detail.resolver';

import {CONST} from './../shared/shared.constants';

@NgModule({
    declarations: [
        GroupsComponent,
        GroupsNewComponent,
        GroupsListComponent,
        GroupsDetailComponent,
        GroupsDetailEditComponent,
        GroupsDetailDiscussionComponent,
        GroupsDetailMembersComponent,
        GroupsDetailAboutComponent,
        GroupsDetailManageComponent,
        GroupsDetailManageMemberRequestsComponent,
        GroupsDetailManageReportedPostsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2MDFValidationMessagesModule.globalConfig(CONST['ng2MDFValidationMessagesConfig']),
        GroupsRoutes,
    ],
    providers: [
        GroupsService,
        GroupsDetailResolver,
        GroupsCanActivateService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class GroupsModule {}