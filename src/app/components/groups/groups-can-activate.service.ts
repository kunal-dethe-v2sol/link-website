import {Injectable} from '@angular/core';
import {Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {GroupsService} from './groups.service';
import {SharedService} from './../shared/service/shared.service';

@Injectable()
export class GroupsCanActivateService implements CanActivateChild {

    //Variables
    public group: any = [];

    //Constructor parameters
    static get parameters() {
        return [
            Router,
            SharedService,
            GroupsService
        ];
    }

    //Constructor
    constructor(
        private _router,
        private _sharedService,
        private _groupsService) {

    }

    //Custom Methods
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        var group_id = state.url.split("/")[2];

        var path = route.url[0].path;

        this.group = this._groupsService.getGroupsDetailEntity();
        if (!this.group.uuid || this.group.uuid != group_id) {
            return new Observable<boolean>(observer => {
                this._groupsService
                    .detail(group_id)
                    .subscribe(
                    (response) => {
                        this.group = response[0].group;
                        this._groupsService.setGroupsDetailEntity(this.group);
        
                        var allow = this.checkPermission(path);
                        observer.next(allow);
                        observer.complete();
                        if(!allow) {
                            this._sharedService.getToastrService().pop('error', 'Error', 'Permission denied.');
                            this._router.navigate(['groups']);
                        }
                    },
                    error => {
                        this._sharedService.getToastrService().pop('error', 'Error', error);
                        observer.next(false);
                        observer.complete();
                        this._router.navigate(['groups']);
                    });
            });
        } else {
            var allow = this.checkPermission(path);
            if(!allow) {
                this._sharedService.getToastrService().pop('error', 'Error', 'Permission denied.');
                this._router.navigate(['groups']);
            } else {
                return allow;
            }
        }
    }

    checkPermission(path) {
        var allow = false;
        switch (path) {
            case 'discussion':
            case 'members':
            case 'about':
                allow = true;
                break;
                
            case 'edit':
                allow = this.group.permissions.edit
                break;

            case 'manage':
            case 'member-requests':
            case 'reported-posts':
                allow = this.group.permissions.manage;
                break;

            default:
                allow = false;
        }
        return allow;
    }

}