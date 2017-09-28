import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SharedService } from './../shared/service/shared.service';

@Injectable()
export class ThreadsService {

    //Variables
    _endpoint = 'threads';
    public refreshThreadListEventEmitter: EventEmitter<boolean> = new EventEmitter();

    //Constructor parameters
    static get parameters() {
        return [
            SharedService
        ];
    }
    //Constructor
    constructor(private _sharedService) { }

    getThread(thread_id): Observable<any[]> {
        return this._sharedService.getHttpService().get(this._endpoint + '/' + thread_id);
    }

    getThreads(): Observable<any[]> {
        return this._sharedService.getHttpService().get(this._endpoint);
    }

    search(value): Observable<any[]> {
        return this._sharedService.getHttpService().get(this._endpoint, { search: value });
    }

    delete(post): Observable<any> {
        return this._sharedService.getHttpService().delete(this._endpoint, post);
    }

    postMessages(value): Observable<any[]> {
        return this._sharedService.getHttpService().post(this._endpoint + '/' + 'messages', value);
    }

    postNewThread(value): Observable<any[]> {
        return this._sharedService.getHttpService().post(this._endpoint + '/' + 'messages', value);
    }

    postNewUsers(thread_id, post): Observable<any[]> {
        return this._sharedService.getHttpService().post(this._endpoint + '/' + thread_id + '/' + 'users',  post);
    }

    getMessages(thread_id): Observable<any[]> {
        return this._sharedService.getHttpService().get(this._endpoint + '/' + thread_id + '/' + 'messages');
    }

    exportMessages(thread_id) {
        return this._sharedService.getHttpService().get(this._endpoint + '/' + thread_id + '/' + 'messages' + '/' + 'export', thread_id);
    }

    connectionSearch(value): Observable<any[]> {
        return this._sharedService.getHttpService().get('connections', { search: value });
    }

    
}
