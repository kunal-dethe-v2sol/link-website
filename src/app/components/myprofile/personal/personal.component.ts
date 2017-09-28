import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SharedService } from './../../shared/service/shared.service';
import { PersonalService } from './personal.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { PersonalInfo } from './personal-info';
import { SharedAuthService } from './../../shared/service/shared-auth.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  //date: DateModel;
  options: DatePickerOptions;
  personal:PersonalInfo;
  token;
  user_id;
  //Constructor parameters
  static get parameters() {
    return [
      PersonalService,
      SharedService,
      SharedAuthService,
      Router
      
    ];
  }

  //Constructor
  constructor(
    private _personalService,
    private _sharedService,
    private _sharedAuthService,
    private _router) {
      this.options = new DatePickerOptions({
        format: 'DD-MM-YYYY'
      });
      this.personal = new PersonalInfo();
      this.getPersonalDetails();
      // let dateModel:DateModel = new DateModel();
      // let momentObj = moment('05-11-1986', "MM-DD-YYYY");
      // dateModel.momentObj = momentObj;
      // dateModel.formatted = momentObj.format();
      // this.personal.dob = dateModel;
      
  }

  ngOnInit() {
    
  }
  getPersonalDetails()
  {
    this.token = this._sharedAuthService.getLoggedInUserToken();
    console.log(this.token);
    this.user_id = this.parseJwt(this.token);
    this._personalService.getPersonalInfo(this.user_id.id)
      .subscribe(
      response => {
        console.log('response', response.user);
        this.personal.alt_email = response[0].user_accounts[1].email;
        this.personal.dob = response[0].dob;
        this.personal.alt_mobile = response[0].alt_mobile;
        this.personal.gender = response[0].gender;
        this.personal.marital_status = response[0].marital_status;
        this.personal.pincode = response[0].zipcode;
      },
      error => {
        console.log('error: ', error);
      });
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  onSubmit(data){
    this.token = this._sharedAuthService.isLoggedIn();
    console.log(data);
    this.user_id = this.parseJwt(this.token);
    this._personalService.updatePersonalInfo(this.user_id.id,this.token,data)
      .subscribe(
      response => {
        if(typeof response.errors != "undefined") {
          console.log('response', response);
        }
      },
      error => {
        console.log('error: ', error);
      });
  }
}
