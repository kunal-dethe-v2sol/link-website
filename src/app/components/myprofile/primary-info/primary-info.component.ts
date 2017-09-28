import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SharedService } from './../../shared/service/shared.service';
import { PrimaryInfoService } from './primary-info.service';
import { SharedAuthService } from './../../shared/service/shared-auth.service';
import { Country } from './country';
import { City } from './city';
import { Primary } from './primary';

@Component({
  selector: 'app-primary-info',
  templateUrl: './primary-info.component.html',
  styleUrls: ['./primary-info.component.css']
})
export class PrimaryInfoComponent implements OnInit {

  //variable
  token;
  user_id;
  primary:Primary;
  // public firstname: string;
  // public lastname: string;
  // public email: string;
  // public mobile_no: number;
  // public summary: string;
  // public country_id: string;
  // public state_id: string;
  // public city_id: string;
  public countries : object;
  public states : object;
  public cities : object;
  // primaryForm: FormGroup;
  // firstname: FormControl;
  // lastname: FormControl;
  // email: FormControl;
  // country: FormControl;
  // state: FormControl;
  // city: FormControl;
  //Constructor parameters
  static get parameters() {
    return [
      PrimaryInfoService,
      SharedService,
      SharedAuthService,
      Router
    ];
  }

  //Constructor
  constructor(
    private _primaryinfoService,
    private _sharedService,
    private _sharedAuthService,
    private _router) {
      this.primary = new Primary();
  }

  ngOnInit() {
    this.token = this._sharedAuthService.getLoggedInUserToken();
    console.log(this.token);
    this.user_id = this.parseJwt(this.token);
    this._primaryinfoService.getPrimaryInfo(this.user_id.id)
      .subscribe(
      response => {
        console.log('response', response[0]);
        //this.firstname = response.user.uuid;
        //this.primaryForm.patchValue({
          this.primary.firstname = response[0].firstname;
          this.primary.lastname = response[0].lastname;
          this.primary.email = response[0].user_accounts[0].email;
          this.primary.mobile_no = response[0].mobile_no;
          this.primary.country_id = response[0].country_id;
          if(this.primary.country_id)
          {
            this.getState(this.primary.country_id);
          }
          this.primary.state_id = response[0].state_id;
          if(this.primary.state_id && this.primary.country_id)
          {
            console.log('test');
            this.getCity(this.primary.state_id);
          }
          this.primary.city_id = response[0].city_id;
          this.primary.summary = response[0].summary;
       // });
      },
      error => {
        console.log('error: ', error);
      });
    this.getCountryList();
    //this.createForm();
  }
  getCountryList(){
    this.token = this._sharedAuthService.isLoggedIn();
    this._primaryinfoService.getAllCountryList()
      .subscribe(
      response => {
        console.log('response', response[0]);
        this.countries = response[0];
        
      },
      error => {
        console.log('error: ', error);
      });
  }

  getState(country_id){
    console.log('Country_id : ',country_id);
    this.token = this._sharedAuthService.isLoggedIn();
    this._primaryinfoService.getStateList(country_id)
      .subscribe(
      response => {
        console.log('response', response);
        this.states = response[0];
        this.cities = null;
      },
      error => {
        console.log('error: ', error);
      });
  }

  getCity(state_id){
    console.log('State_id : ',state_id);
    this.token = this._sharedAuthService.isLoggedIn();
    this._primaryinfoService.getCityList(state_id)
      .subscribe(
      response => {
        console.log('response', response);
        this.cities = response[0];
        
      },
      error => {
        console.log('error: ', error);
      });
  }


  // createFormControls() {
    
  //   this.firstname = new FormControl('', Validators.required);
  //   this.lastname = new FormControl('', Validators.required);
  //   this.email = new FormControl('', [
  //     Validators.required,
  //     Validators.pattern("[^ @]*@[^ @]*")
  //   ]);
  //   this.country = new FormControl('');
  //   this.state = new FormControl('');
  //   this.city = new FormControl('');
    
  // }

  // createForm() {
  //   this.primaryForm = new FormGroup({
  //     firstname: this.firstname,
  //     lastname: this.lastname,
  //     email: this.email,
  //     country:this.country,
  //     state:this.state,
  //     city:this.city
  //   });
  // }

  //JWT Token decode
  parseJwt(token) {
    //console.log(token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
  selectedCountry: Country = new Country(2, 'India');
  // countries = [
  //   new Country(1, 'USA'),
  //   new Country(2, 'India'),
  //   new Country(3, 'Australia'),
  //   new Country(4, 'Brazil')
  // ];

  selectedCity: City = new City(2, 'Mumbai');
  Cities = [
    new City(1, 'Delhi'),
    new City(2, 'Mumbai'),
    new City(3, 'Pune'),
    new City(4, 'Surat')
  ];

  onSubmit(data){
    console.log(data);
    this._primaryinfoService.updatePrimaryInfo(data)
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
