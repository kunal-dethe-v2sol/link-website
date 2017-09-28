import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from './../../shared/service/shared.service';
import { SharedAuthService } from './../../shared/service/shared-auth.service';
import { ExperienceService } from './experience.service';
import { PrimaryInfoService } from './../../myprofile/primary-info/primary-info.service';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  public expForm: FormGroup;
  employername: string = '';
  role: string = '';
  public countries : object;
  public states : object;
  public cities : object;

  static get parameters() {
    return [
      Router,
      FormBuilder,
      SharedService,
      ExperienceService,
      PrimaryInfoService
    ];
  }

  //Constructor
  constructor(
    private _router,
    private _fb,
    private _sharedService,
    private _sharedAuthService,
    private _experienceService,
    private _primaryinfoService) {

  }

  ngOnInit() {
    this.expForm = this._fb.group({
      expDiv: this._fb.array([this.initItemRows()])
    });
    this.getAllExperienceDetails();
    this.getCountryList();
  }
  getAllExperienceDetails() {
    var data = {
      "experience": [
        {
          "uuid": "0001",
          "employername": "sandeep",
          "role": "software Engineer"
        },
        {
          "uuid": "0002",
          "employername": "Bhavin",
          "role": "software developer"
        }
      ]
    };
    console.log(data);
    var count = 1;
    for (var i = 0; i < data.experience.length; i++) {
      var experience = data.experience[i];
      // console.log(data.experience.length);
      // console.log(count);
      // console.log(element);
      this.expForm.controls['expDiv']['controls'][i]
        .setValue({ 
          employername: experience.employername, 
          role: experience.role, 
          fromdate: '' ,
          todate:'',
          tillnow:'',
          country_id:'',
          state_id:'',
          city_id:'',
          industry:'',
          functional_area:'',
          designation:'',
          achievement:'',
          short_description:''
        });
      if (data.experience.length > count) {
        this.addNew();
        count++;
      }
    }

    //(<FormControl>this.expForm.controls['employername']).setValue('John',{ onlySelf: true });
    //this.expForm.controls['expDiv']['controls'][0].setValue({employername:'Sandeep', role: 'abc'});
    //this.expForm.controls[0].setValue({employername:'Sandeep'});
  }

  getCountryList(){
   
    this._experienceService.getAllCountryList()
      .subscribe(
      response => {
        console.log('response', response[0]);
        this.countries = response[0];
        
      },
      error => {
        console.log('error: ', error);
      });
  }

  // getState(country_id){
  //   console.log('Country_id : ',country_id);
  //   //this.token = this._sharedAuthService.isLoggedIn();
  //   this._primaryinfoService.getStateList(country_id)
  //     .subscribe(
  //     response => {
  //       console.log('response', response);
  //       this.states = response[0];
  //       this.cities = null;
  //     },
  //     error => {
  //       console.log('error: ', error);
  //     });
  // }

  // getCity(state_id){
  //   console.log('State_id : ',state_id);
  //   this.token = this._sharedAuthService.isLoggedIn();
  //   this._primaryinfoService.getCityList(state_id)
  //     .subscribe(
  //     response => {
  //       console.log('response', response);
  //       this.cities = response[0];
        
  //     },
  //     error => {
  //       console.log('error: ', error);
  //     });
  // }

  initItemRows() {
    return this._fb.group({
      employername: ['', <any>Validators.required],
      role: ['', Validators.required],
      fromdate: ['', Validators.required],
      todate:['',Validators.required],
      tillnow:[''],
      country_id:['', Validators.required],
      state_id:['', Validators.required],
      city_id:['', Validators.required],
      industry:['', Validators.required],
      functional_area:['', Validators.required],
      designation:['', Validators.required],
      achievement:[''],
      short_description:['']
    });
  }
  addNew() {
    const control = <FormArray>this.expForm.controls['expDiv'];
    control.push(this.initItemRows());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.expForm.controls['expDiv'];
    control.removeAt(i);
  }

  onSubmit(data) {
    console.log(data);
  }


}
