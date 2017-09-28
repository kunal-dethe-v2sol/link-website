import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SharedService } from './../../shared/service/shared.service';

@Injectable()
export class PersonalService {
  _endpoint = 'users';
  _update_personalInfoendpoint = 'users';
  
  static get parameters() {
    return [
      SharedService
    ];
  }

  //Constructor
  constructor(
    private _sharedService) {
  }

  
  getPersonalInfo(user_id,token): Observable<any> {
    this._endpoint = this._endpoint+'/'+user_id;
    return this._sharedService.getHttpService().detail(this._endpoint, token);
  }

  updatePersonalInfo(user_id,token,data): Observable<any> {
    var endpoint = this._update_personalInfoendpoint+'/'+user_id+'/.json?token='+token;
    return this._sharedService.getHttpService().update(endpoint,data);
  }
}
