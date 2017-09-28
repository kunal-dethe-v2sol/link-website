import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SharedService } from './../shared/service/shared.service';

@Injectable()
export class SocialService {

  //Variables
  _endpoint = 'login';

  private configObj = {"authEndpoint":"","clientId":"","redirectURI":""};
  private code:string;
  private loginProvider: string;

  //Constructor parameters
  static get parameters() {
    return [
      SharedService
    ];
  }

  //Constructor
  constructor(
    private _sharedService) {
      let config = localStorage.getItem("authConfig");
      let provider = localStorage.getItem("provider");
      if(config)
      {
        this.configObj = JSON.parse(config)[provider];
      }
      if(provider){
      this.loginProvider =  provider;
    } 
    console.log('login type',this.loginProvider);
  }
  
  getSocialDetails(code): Observable<any> {
    console.log('Gmail redirect url :',this.configObj.redirectURI);
    var body = {"type":this.loginProvider,"code" : code,"clientId" : this.configObj.clientId,"redirectUri":this.configObj.redirectURI}
    return this._sharedService.getHttpService().create(this._endpoint, body,{});
  }


  public auth(provider:string, authConfig: any):void{
    
    localStorage.setItem("authConfig",JSON.stringify(authConfig));
    localStorage.setItem("provider",provider);

    if(provider == "linkedin"){ 
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id='+authConfig.linkedin.clientId+'&redirect_uri='+authConfig.linkedin.redirectURI+'&response_type=code';
  }
   if(provider == "facebook"){ 
       window.location.href = 'https://www.facebook.com/v2.8/dialog/oauth?client_id='+authConfig.facebook.clientId+'&redirect_uri='+authConfig.facebook.redirectURI+'&scope=email';
  }
   if(provider == "google"){ 
       window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id='+authConfig.google.clientId+'&redirect_uri='+authConfig.google.redirectURI+'&scope=email%20profile';
  }
  }
}
