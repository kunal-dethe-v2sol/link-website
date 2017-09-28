import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SocialService } from './social.service';
import { SharedService } from './../shared/service/shared.service';
@Component({
  selector: 'app-social',
  template: `
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
      <button (click)="googleLogin()" class="btn btn-block btn-social btn-google">
          <span class="fa fa-google"></span> Sign in with Google
      </button>
      <button (click)="facebookLogin()" class="btn btn-block btn-social btn-facebook">
          <span class="fa fa-facebook"></span> Sign in with Facebook
      </button>
      <button (click)="linkedinLogin()" class="btn btn-block btn-social btn-linkedin">
          <span class="fa fa-linkedin"></span> Sign in with LinkedIn
      </button>
      </div>
    </div>`,
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  //Constructor parameters
  static get parameters() {
    return [
      SocialService,
      SharedService,
      Router
    ];
  }

  //Constructor
  constructor(private _socialService,
    private _sharedService,
    private _router) {


  }

  ngOnInit() {
  }
  @Input()
  authConfig: any;


  linkedinLogin() {
    this._socialService.auth('linkedin', this.authConfig);
  }
  facebookLogin() {
    this._socialService.auth('facebook', this.authConfig);
  }
  googleLogin() {
    this._socialService.auth('google', this.authConfig);
  }

}
