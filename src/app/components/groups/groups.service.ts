import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SharedService} from './../shared/service/shared.service';

@Injectable()
export class GroupsService {

    //Variables
    private _endpoint = 'groups';
    private _loggedInUserId = '';
    public group = [];
    public updateGroupDetailLayoutEventEmitter: EventEmitter<boolean> = new EventEmitter();
    public reloadGroupRelatedPageEventEmitter: EventEmitter<boolean> = new EventEmitter();

    //Constructor parameters
    static get parameters() {
        return [
            SharedService
        ];
    }

    //Constructor
    constructor(
        private _sharedService) {

        
    }

    //Custom Methods
    getLoggedInUserId() {
        this._loggedInUserId = this._sharedService.getAuthService().getLoggedInUserData().uuid;
        return this._loggedInUserId;
    }
    
    getGroupsDetailEntity() {
        return this.group;
    }
    
    setGroupsDetailEntity(group) {
        this.group = group;
    }
    
    list(type, page = 1, limit = 0): Observable<any> {
        var queryStringParams = {
            type: type,
            page: page
        }
        if(limit) {
            queryStringParams['limit'] = limit;
        }
        return this._sharedService.getHttpService().get(this._endpoint, queryStringParams);
    }
    
    getConnectionList() {
        var queryStringParams = {
            page: 1
        }
        return this._sharedService.getHttpService().get('connections', queryStringParams);
    }
    
    searchConnectionList(search) {
        var queryStringParams = {
            page: 1,
            search: search
        }
        return this._sharedService.getHttpService().get('connections', queryStringParams);
    }

    new(postData) {
        var endpoint = this._endpoint;
        console.log('postData', postData);
        return this._sharedService.getHttpService().post(endpoint, postData, {});
    }
    
    edit(group_id, putData) {
        var endpoint = this._endpoint + '/' + group_id;
        console.log('putData', putData);
        return this._sharedService.getHttpService().put(endpoint, putData, {});
    }
    
    detail(group_id): Observable<any> {
        var endpoint = this._endpoint + '/' + group_id;
        return this._sharedService.getHttpService().get(endpoint);
    }
    
    join(group_id): Observable<any> {
        var endpoint = this._endpoint + '/' + group_id + '/members';
        var user_ids = [
            this.getLoggedInUserId()
        ];
        var postData = {
            group_id: group_id,
            request_type: 'self',
            user_ids: user_ids
        };
        return this._sharedService.getHttpService().post(endpoint, postData, {});
    }
    
    leave(group_id, group_member_id, status): Observable<any> {
        var endpoint = this._endpoint + '/' + group_id + '/members/' + group_member_id;
        var deleteData = {
            status: 'left',
            reason: status
        };
        return this._sharedService.getHttpService().delete(endpoint, deleteData, {});
    }

    memberRequestList(group_id, page = 1) {
        var endpoint = this._endpoint + '/' + group_id + '/members';
        var queryStringParams = {
            page: page,
            status: 'requested'
        }
        return this._sharedService.getHttpService().get(endpoint, queryStringParams);
    }
    
    acceptMemberRequest(group_id, group_member_id) {
        var endpoint = this._endpoint + '/' + group_id + '/members/' + group_member_id + '/status';
        var putData = {
            status: 'member'
        };
        return this._sharedService.getHttpService().put(endpoint, putData);
    }
    
    rejectMemberRequest(group_id, group_member_id) {
        var endpoint = this._endpoint + '/' + group_id + '/members/' + group_member_id + '/status';
        var putData = {
            status: 'rejected'
        };
        return this._sharedService.getHttpService().delete(endpoint, putData);
    }
    
    groupMembers(group_id, type, page = 1, limit = 0): Observable<any> {
        var queryStringParams = {
            status: type,
            page: page,
        }
        if(limit) {
            queryStringParams['limit'] = limit;
        }
        
        var endpoint = this._endpoint + '/' + group_id + '/members';
        return this._sharedService.getHttpService().get(endpoint, queryStringParams);
    }

    makeModerator(group_id, group_member_id) {
        var endpoint = this._endpoint + '/' + group_id + '/members/' + group_member_id;
        var putData = {
            status: 'moderator'
        };
        return this._sharedService.getHttpService().put(endpoint, putData);
    }
    
    removeFromGroup(group_id, group_member_id) {
        var endpoint = this._endpoint + '/' + group_id + '/members/' + group_member_id;
        var putData = {
            status: 'removed'
        };
        return this._sharedService.getHttpService().delete(endpoint, putData);
    }
    
    removeAsModerator(group_id, group_member_id) {
        var endpoint = this._endpoint + '/' + group_id + '/members/' + group_member_id;
        var putData = {
            status: 'member'
        };
        return this._sharedService.getHttpService().put(endpoint, putData);
    }

    delete(group_id): Observable<any> {
        var endpoint = this._endpoint + '/' + group_id;
        return this._sharedService.getHttpService().delete(endpoint);
    }
    
    newGroupPost(postData) {
        var endpoint = 'posts';
        return this._sharedService.getHttpService().post(endpoint, postData, {});
    }
}
