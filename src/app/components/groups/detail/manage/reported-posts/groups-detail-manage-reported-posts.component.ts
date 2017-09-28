import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GroupsService} from './../../../groups.service';
import {SharedService} from './../../../../shared/service/shared.service';

@Component({
    selector: 'linkcxo-groups-detail-manage-reported-posts',
    templateUrl: './groups-detail-manage-reported-posts.component.html'
})
export class GroupsDetailManageReportedPostsComponent implements OnInit {

    //Variables
    public group_id = '';
    public group = [];

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
    }

    //Angular Hooks
    ngOnInit() {
        
    }

    //Custom Methods
    
}
