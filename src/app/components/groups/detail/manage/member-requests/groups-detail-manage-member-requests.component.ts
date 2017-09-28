import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GroupsService} from './../../../groups.service';
import {SharedService} from './../../../../shared/service/shared.service';

@Component({
    selector: 'linkcxo-groups-detail-manage-member-requests',
    templateUrl: './groups-detail-manage-member-requests.component.html'
})
export class GroupsDetailManageMemberRequestsComponent implements OnInit {

    //Variables
    public group_id = '';
    public group: any = [];
    public requests = [];
    public showBusy = true;
    public page = 1;
    public total_count = 0;

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
    }

    //Angular Hooks
    ngOnInit() {
        this.list();
    }

    //Custom Methods
    list() {
        this.showBusy = true;
        
        this._groupsService
            .memberRequestList(this.group_id, this.page)
            .subscribe(
            response => {
                this.showBusy = false;
                this.requests = response[0].group_members;
                this.total_count = response[0].total_count;
            },
            error => {
                console.log('error: ', error);
            });
    }
    
    accept(group_member_id) {
        this._groupsService
            .acceptMemberRequest(this.group_id, group_member_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list();
            },
            error => {
                console.log('error: ', error);
            });
    }

    reject(group_member_id) {
        if(confirm("Do you wish to reject this member's request?")) {
            this._groupsService
                .rejectMemberRequest(this.group_id, group_member_id)
                .subscribe(
                response => {
                    this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                    this.list();
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }
}
