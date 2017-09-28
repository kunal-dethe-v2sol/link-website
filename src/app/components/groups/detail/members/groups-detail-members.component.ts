import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GroupsService} from './../../groups.service';
import {SharedService} from './../../../shared/service/shared.service';
import {CONST} from './../../../shared/shared.constants';

@Component({
    selector: 'linkcxo-groups-detail-members',
    templateUrl: './groups-detail-members.component.html'
})
export class GroupsDetailMembersComponent implements OnInit {

    //Variables
    public group_id = '';
    public group: any = [];
    public admins = [];
    public moderators = [];
    public members = [];
    public showListAdmins = true;
    public showListModerators = false;
    public showBusyAdmins = true;
    public showBusyModerators = true;
    public showBusyMembers = true;

    //Constructor parameters
    static get parameters() {
        return [
            Router,
            ActivatedRoute,
            SharedService,
            GroupsService
        ];
    }

    //Constructor
    constructor(
        private _router,
        private _activatedRoute,
        private _sharedService,
        private _groupsService) {

        //This value is set from the GroupsCanActivateService.
        this.group = this._groupsService.getGroupsDetailEntity();
        
        this.group_id = this.group.uuid;
        
        /**
         * Listens to the emit fired to reload the page as the group detail api is fired.
         * This may happen when:
         * 1. Member leaves the group.
         * 2. Member joins the group.
         */
        this._groupsService.reloadGroupRelatedPageEventEmitter.subscribe(
            () => {
                this.ngOnInit();
            });
    }

    //Angular Hooks
    ngOnInit() {
        this.list('admin');
        this.list('moderator');
        this.list('member');
    }

    //Custom Methods
    show(status) {
        if(status == 'admin') {
            this.showListAdmins = true;
            this.showListModerators = false;
        } else if(status == 'moderator') {
            this.showListAdmins = false;
            this.showListModerators = true;
        }
    }
    
    list(status) {
        if(status == 'admin') {
            this.showBusyAdmins = true;
        } else if(status == 'moderator') {
            this.showBusyModerators = true;
        } else if(status == 'member') {
            this.showBusyMembers = true;
        }
            
        this._groupsService
            .groupMembers(this.group_id, status, 1, CONST['paginationLimitShortListing'])
            .subscribe(
            response => {
                if (status == 'admin') {
                    this.showBusyAdmins = false;
                    this.admins = response[0];
                } else if (status == 'moderator') {
                    this.showBusyModerators = false;
                    this.moderators = response[0];
                } else if (status == 'member') {
                    this.showBusyMembers = false;
                    this.members = response[0];
                }
            },
            error => {
                console.log('error: ', error);
                this.showBusyAdmins = false;
                this.showBusyModerators = false;
                this.showBusyMembers = false;
            });
    }
    
    makeModerator(group_member_id, status) {
        this._groupsService
            .makeModerator(this.group_id, group_member_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list(status);
                this.list('moderator');
            },
            error => {
                console.log('error: ', error);
            });
    }
    
    removeFromGroup(group_member_id, status) {
        this._groupsService
            .removeFromGroup(this.group_id, group_member_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list(status);
            },
            error => {
                console.log('error: ', error);
            });
    }
    
    removeAsModerator(group_member_id, status) {
        this._groupsService
            .removeAsModerator(this.group_id, group_member_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list(status);
                this.list('member');
            },
            error => {
                console.log('error: ', error);
            });
    }
    
    leaveGroup(group_member_id, status) {
        var reason = prompt("Please enter a reason to leave the group", "");
        if (reason != null) {
            this._groupsService
                .leave(this.group_id, group_member_id, reason)
                .subscribe(
                response => {
                    this._groupsService.updateGroupDetailLayoutEventEmitter.emit();
                    this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                    //this.list(status);
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }
}
