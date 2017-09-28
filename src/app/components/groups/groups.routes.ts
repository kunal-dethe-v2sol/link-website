import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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

import {GroupsDetailResolver} from './detail/groups-detail.resolver';

import {SharedCanActivateAuthService} from './../shared/service/shared-can-activate-auth.service';
import {GroupsCanActivateService} from './groups-can-activate.service';

const routes: Routes = [
    {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [SharedCanActivateAuthService]
    },
    {
        path: 'groups/new',
        component: GroupsNewComponent,
        canActivate: [SharedCanActivateAuthService]
    },
    {
        path: 'groups/manage',
        component: GroupsListComponent,
        data: {
            type: 'manage'
        },
        canActivate: [SharedCanActivateAuthService]
    },
    {
        path: 'groups/joined',
        component: GroupsListComponent,
        data: {
            type: 'joined'
        },
        canActivate: [SharedCanActivateAuthService]
    },
    {
        path: 'groups/trending',
        component: GroupsListComponent,
        data: {
            type: 'trending'
        },
        canActivate: [SharedCanActivateAuthService]
    },
    {
        path: 'groups/:group_id',
        component: GroupsDetailComponent,
//        resolve: {
//          group: GroupsDetailResolver
//        },
        canActivate: [SharedCanActivateAuthService],
        canActivateChild: [GroupsCanActivateService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'discussion'
            },
            {
                path: 'edit',
                component: GroupsDetailEditComponent
            },
            {
                path: 'discussion',
                component: GroupsDetailDiscussionComponent
            },
            {
                path: 'members',
                component: GroupsDetailMembersComponent
            },
            {
                path: 'about',
                component: GroupsDetailAboutComponent
            },
            {
                path: 'manage',
                component: GroupsDetailManageComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'member-requests'
                    },
                    {
                        path: 'member-requests',
                        component: GroupsDetailManageMemberRequestsComponent
                    },
                    {
                        path: 'reported-posts',
                        component: GroupsDetailManageReportedPostsComponent
                    }
                ]
            },
        ]
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class GroupsRoutes {}
