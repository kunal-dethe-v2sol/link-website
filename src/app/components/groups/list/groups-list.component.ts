import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {GroupsService} from './../groups.service';
import {SharedService} from './../../shared/service/shared.service';
import {CONST} from './../../shared/shared.constants';

@Component({
    selector: 'linkcxo-groups-list',
    templateUrl: './groups-list.component.html'
})
export class GroupsListComponent implements OnInit {

    //Variables
    public type = '';
    public title = '';
    public groups = [];
    public showBusy = true;
    public page = 1;
    public limit = CONST['paginationLimitShortListing'];
    public total_count = 0;

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
        this._activatedRoute.data.subscribe(data => {
            this.type = data['type'];
        });
        
        if(this.type == 'manage') {
            this.title = 'Groups You Manage';
        } else if(this.type == 'joined') {
            this.title = 'Groups You Have Joined';
        } else if(this.type == 'trending') {
            this.title = 'Trending Groups';
        }
        
        this.list();
    }

    //Custom Methods
    previousPage() {
        this.page--;
        this.list();
    }
    nextPage() {
        this.page++;
        this.list();
    }
     
    list() {
        this.showBusy = true;
        this.groups = [];
        
        this._groupsService
            .list(this.type, this.page)
            .subscribe(
            response => {
                this.showBusy = false;
                this.groups = response[0].groups;
                this.total_count = response[0].total_count;
            },
            error => {
                console.log('error: ', error);
            });
    }
    
    join(group_id, type) {
        this._groupsService
            .join(group_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list();
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
                    this.list();
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
                    this.list();
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }
}
