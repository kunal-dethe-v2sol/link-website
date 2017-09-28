import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {GroupsService} from './../groups.service';

@Injectable()
export class GroupsDetailResolver implements Resolve<any> {

    //Variables


    //Constructor parameters
    static get parameters() {
        return [
            GroupsService
        ];
    }

    //Constructor
    constructor(
        private _groupsService) {


    }

    //Custom Methods
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this._groupsService.detail(route.params.group_id);
    }
}