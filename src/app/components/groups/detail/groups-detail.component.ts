import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GroupsService} from './../groups.service';
import {SharedService} from './../../shared/service/shared.service';

@Component({
    selector: 'linkcxo-groups-detail',
    templateUrl: './groups-detail.component.html'
})
export class GroupsDetailComponent implements OnInit {

    //Variables
    public group_id = '';
    public group: any = [];

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

        /**
         * Listens to the emit fired to update the header of the group detail layout.
         * This may happen when:
         * 1. Member leaves the group.
         */
        this._groupsService.updateGroupDetailLayoutEventEmitter.subscribe(
            () => {
                this.detail(this.group_id);
            });
    }

    //Angular Hooks
    ngOnInit() {
        this.group = this._groupsService.getGroupsDetailEntity();
        
        this.group_id = this.group.uuid;
    }

    //Custom Methods
    detail(group_id) {
        this._groupsService
            .detail(group_id)
            .subscribe(
            response => {
                this.group = response[0].group;
                this._groupsService.reloadGroupRelatedPageEventEmitter.emit();
            },
            error => {
                console.log('error: ', error);
            });
    }
    
    join(group_id) {
        this._groupsService
            .join(group_id)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.detail(this.group_id);
                //this.list();
            },
            error => {
                console.log('error: ', error);
            });
    }

    leave(group_id, group_member_id) {
        var reason = prompt("Please enter a reason to leave the group", "");
        if (reason != null) {
            this._groupsService
                .leave(group_id, group_member_id, reason)
                .subscribe(
                response => {
                    this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                    this.detail(this.group_id);
                    //this.list();
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }
    
    delete(group_id) {
        if(confirm("Do you wish to delete the group?")) {
            this._groupsService
                .delete(group_id)
                .subscribe(
                response => {
                    this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                    this._router.navigate(['groups']);
                },
                error => {
                    console.log('error: ', error);
                });
        }
    }
}
