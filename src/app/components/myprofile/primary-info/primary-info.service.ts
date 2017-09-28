import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SharedService } from './../../shared/service/shared.service';

@Injectable()
export class PrimaryInfoService {

  //Variables
  _endpoint = 'users';
  _Country_endpoint = "countries";
  _state_endpoint = "states";
  _city_endpoint = "cities";
  _primaryinfo_endpoint = "cities";
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

  getPrimaryInfo(user_id): Observable<any> {
    this._endpoint = this._endpoint+'/'+user_id+'/';
    return this._sharedService.getHttpService().detail(this._endpoint);
  }

  getAllCountryList(): Observable<any> {
     console.log('country');
    return this._sharedService.getHttpService().detail(this._Country_endpoint);
  }

  getStateList(country_id,token): Observable<any> {
    var endpoint = this._state_endpoint+'/'+country_id+'/';
    console.log('new_state_endpoint : ', endpoint);
    return this._sharedService.getHttpService().detail(endpoint);
  }

  getCityList(state_id,token): Observable<any> {
    var endpoint =  this._city_endpoint+'/'+state_id+'/';
    return this._sharedService.getHttpService().detail(endpoint);
  }

  updatePrimaryInfo(data): Observable<any> {
    var endpoint = this._primaryinfo_endpoint;
    return this._sharedService.getHttpService().update(endpoint);
  }

}
