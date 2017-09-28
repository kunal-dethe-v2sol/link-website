import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {SharedService} from './../shared/service/shared.service';
import { ForgotPasswordService } from './forgot-password.service';
import { Subscription }                 from 'rxjs/Subscription';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  //Variables
    forgotPasswordForm: FormGroup;
    email: FormControl;
    private accesstoken;
    private code;
    //Constructor parameters
    static get parameters() {
        return [
            ForgotPasswordService,
            SharedService,
            Router 
        ];
    }

    //Constructor
    constructor(private _forgotPasswordService,
        private _sharedService,
        private _router) {


    }

    //Angular Hooks
    ngOnInit() {
      //http://localhost:4200/?#access_token=MY_ACCESS_TOKEN&code=MY_CODE
      //get query string parameters
      // this._router
      // .queryParams
      // .subscribe(params => {
      //     this.accesstoken = params['access_token'];
      //     this.code = params['code'];
      // });

      // console.log(this.code);
    this.createFormControls();
    this.createForm();
  }

  
  createFormControls() {
    
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    
  }

  createForm() {
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    });
  }

  onSubmit(data): void {
    console.log('forgotpassword', data);
    this._forgotPasswordService.forgotpassword(data)
      .subscribe(
      response => {
        //Get api response
          console.log('response', response);
          this._router.navigate(['login']);
      },
      error => {
        console.log('error: ', error);
      });
  }

}
