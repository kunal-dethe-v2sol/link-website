import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {GroupsService} from './groups.service';
import {SharedService} from './../shared/service/shared.service';
import {CONST} from './../shared/shared.constants';

@Component({
    selector: 'linkcxo-groups',
    templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {

    //Variables
    public ownGroups = [];
    public joinedGroups = [];
    public trendingGroups = [];
    public showListOwnGroups = true;
    public showListJoinedGroups = false;
    public showBusyOwnGroups = true;
    public showBusyJoinedGroups = true;
    public showBusyTrendingGroups = true;

    //Constructor parameters
    static get parameters() {
        return [
            ActivatedRoute,
            SharedService,
            GroupsService
        ];
    }

    //Constructor
    constructor(
        private _activatedRoute,
        private _sharedService,
        private _groupsService) {


    }

    //Angular Hooks
    ngOnInit() {
        this.list('manage');
        this.list('joined');
        this.list('trending');
    }

    //Custom Methods
    show(type) {
        if(type == 'manage') {
            this.showListOwnGroups = true;
            this.showListJoinedGroups = false;
        } else if(type == 'joined') {
            this.showListOwnGroups = false;
            this.showListJoinedGroups = true;
        }
    }
    
    list(type) {
        if(type == 'manage') {
            this.showBusyOwnGroups = true;
        } else if(type == 'joined') {
            this.showBusyJoinedGroups = true;
        } else if(type == 'trending') {
            this.showBusyTrendingGroups = true;
        }
            
        this._groupsService
            .list(type, 1, CONST['paginationLimitShortListing'])
            .subscribe(
            response => {
                if (type == 'manage') {
                    this.showBusyOwnGroups = false;
                    this.ownGroups = response[0];
                } else if (type == 'joined') {
                    this.showBusyJoinedGroups = false;
                    this.joinedGroups = response[0];
                } else if (type == 'trending') {
                    this.showBusyTrendingGroups = false;
                    this.trendingGroups = response[0];
                }
            },
            error => {
                console.log('error: ', error);
                this.showBusyOwnGroups = false;
                this.showBusyJoinedGroups = false;
                this.showBusyTrendingGroups = false;
            });
    }
    
    join(group_id, type) {
        this._groupsService
            .join(group_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list(type);
                this.list('joined');
            },
            error => {
                console.log('error: ', error);
            });
    }

    leave(group_id, group_member_id, type) {
        var reason = prompt("Please enter a reason to leave the group", "");
        if (reason != null) {
            this._groupsService
                .leave(group_id, group_member_id, reason)
                .subscribe(
                response => {
                    this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                    this.list(type);
                    this.list('trending');
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }

    delete(group_id, type) {
        if(confirm("Do you wish to delete the group?")) {
            this._groupsService
                .delete(group_id)
                .subscribe(
                response => {
                    this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                    this.list(type);
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }
}
