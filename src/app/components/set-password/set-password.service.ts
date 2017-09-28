import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SharedService } from './../shared/service/shared.service';

@Injectable()
export class SetPasswordService {

  //Variables
  _endpoint = 'users';

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

  updatePassword(data,user_id,password_token): Observable<any> {
    console.log('test',data);
    //endpoint = this._endpoint+'/'+user_id+'/set-password'+password_token+'/.json';
    return this._sharedService.getHttpService().update(this._endpoint+'/'+user_id+'/set-password/'+password_token+'/.json', data);
  }

}
