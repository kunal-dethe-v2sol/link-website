import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {SharedService} from './../shared/service/shared.service';
import { SetPasswordService } from './set-password.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'linkcxo-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  //Veriable
  setPasswordForm: FormGroup;
  user_id = "3397623e-3d66-48be-8302-7d5d81877dd0";
  password_token = "3cPKI3Enog9gjepz1YDWgrgQYNnSzo8qmpQREapgNRuPNtA7Bwk333YRlHEAdQsL";
  new_password: FormControl;
  confirm_password: FormControl;

  //Constructor parameters
    static get parameters() {
        return [
          SetPasswordService,
            SharedService,
            Router
            
        ];
    }
  //Constructor
    constructor(private _setpassword,
        private _sharedService,
        private _router) {
    }

    public account = {
        password: <string>null
    };
    public barLabel: string = "Password strength:";

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.new_password = new FormControl('', [
      Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    ]);
    this.confirm_password = new FormControl('', [
      Validators.required,
      CustomValidators.equalTo(this.new_password)
    ]);
  }

  createForm() {
    this.setPasswordForm = new FormGroup({
      new_password: this.new_password,
      confirm_password: this.confirm_password
    });
  }

  onSubmit(data): void {
    console.log('set-password: ', this.user_id);
      this._setpassword.updatePassword(data,this.user_id,this.password_token)
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
