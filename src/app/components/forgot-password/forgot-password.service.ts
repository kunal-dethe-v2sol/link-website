import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SharedService } from './../shared/service/shared.service';

@Injectable()
export class ForgotPasswordService {

  //Variables
  _endpoint = 'request/password.json';

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

  forgotpassword(data): Observable<any> {
    console.log('forgot password',data);
    return this._sharedService.getHttpService().update(this._endpoint, data);
  }

}
