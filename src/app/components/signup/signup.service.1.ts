import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Signup } from './signup';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {

  constructor(private http:Http) { }

  postData(data): Observable<Signup> {
    //console.log('data',signup);
    let headers = new Headers({ 'Access-Control-Allow-Headers':'*','Accept':'application/json','Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log('data',data);
    return this.http
            //.post('http://192.168.50.155/linkcxo-api/api/signup',data,options)
            .post('http://localhost/linkcxo-api/api/signup',data,options)
            .map(res =>  res.json())
            .catch(this.handleErrorObservable);
            //.do(data => console.log('All: ' + JSON.stringify(data)))  //Helps to check whole message
  }

  private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
  }

  private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }
}
