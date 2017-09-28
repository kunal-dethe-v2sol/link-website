import { NgModule, Component, Pipe, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SignupService } from './signup.service';
import { SocialService } from './../social/social.service';
import { Signup } from './signup';

@Component({
  selector: 'linkcxo-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  //Variables
  //signupp = [];
  //responseStatus: Object = [];
  signupForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  email: FormControl;
  mobile_no: FormControl;
  registration_type: FormControl;
  social_type: FormControl;
  errorMessage: string;
  signup = new Signup();
  otp: FormControl;
  showVerifyOtpTextbox = false;
  OTP_Request = "OTP Request";
  verifyData;
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImExZGQ4ZDI4LWQ2ZTgtNDIxNi1iMGFjLWEwMDE1OTkzY2I2NyIsInN1YiI6ImExZGQ4ZDI4LWQ2ZTgtNDIxNi1iMGFjLWEwMDE1OTkzY2I2NyIsImV4cCI6MTUwMzkwNTU5Mn0.nUZozAzG2Pf7Tqn9c4gXdYvFXDsxxYmLOuYMWpELXyY";
  //Constructor
  constructor(
    private signupService: SignupService,
    private _socialService: SocialService) { }

  //Angular Hooks
  // ngOnInit() {
  //     this.signupForm = new FormGroup({
  //         firstname:new FormControl("",Validators.compose([Validators.required])),
  //         lastname:new FormControl("",Validators.compose([Validators.required])),
  //         email:new FormControl("",Validators.compose([Validators.required,Validators.pattern("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/")])),
  //         mobileno:new FormControl("",Validators.compose([Validators.required]))
  //     });
  // }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    //this.parseJwt(this.token);
  }
  //JWT Token decode
//   parseJwt (token) {
//       var base64Url = token.split('.')[1];
//       var base64 = base64Url.replace('-', '+').replace('_', '/');
//       console.log(JSON.parse(window.atob(base64)));
//  };
  private authServerBaseUrl = 'http://dev.linkcxo.com';
  private config = {
    "loginRoute": "login",
    "linkedin": {
      "authEndpoint": this.authServerBaseUrl + "/auth/linkedin",
      "clientId": "819af5pgvbpd35",
      "redirectURI": this.authServerBaseUrl + "/login"
    },
    "facebook": {
      "authEndpoint": this.authServerBaseUrl + "/auth/facebook",
      "clientId": "1634481159911625",
      "redirectURI": this.authServerBaseUrl + "/login"
    },
    "google": {
      "authEndpoint": this.authServerBaseUrl + "/auth/google",
      "clientId": "1060369273388-j8394g2hbt09s42r7js1keslq5cqlgg2.apps.googleusercontent.com",
      "redirectURI": this.authServerBaseUrl + "/login"
    }
  }
  
  createFormControls() {
    this.registration_type = new FormControl('direct-request');
    this.social_type = new FormControl('linkcxo');
    this.otp = new FormControl('');
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.mobile_no = new FormControl('', [
      Validators.required,
      //Validators.pattern('/^[0-9]{10,10}$/'),
      Validators.maxLength(10)
    ]);
  }

  createForm() {
    this.signupForm = new FormGroup({
      registration_type: this.registration_type,
      social_type: this.social_type,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      mobile_no: this.mobile_no,
      otp: this.otp
    });
  }

  onSubmit(data): void {
    console.log('signup', data);
    this.signupService.create(data)
      .subscribe(
      response => {
        if(typeof response.errors != "undefined") {
          console.log('response', response.errors.mobile_no);
        }
      },
      error => {
        console.log('error: ', error);
      });
  }

  onClickVerify(otp) {
    this.verifyData = {mobile_no:this.signupForm.get('mobile_no').value};
    
    this.signupService.verifyMobile_no(this.verifyData)
      .subscribe(
      response => {
        if(typeof response.errors != "undefined") {
          console.log('response', response.errors.mobile_no);
        }
        console.log('response', response);
      },
      error => {
        console.log('error: ', error);
      });
    this.OTP_Request = "Resend OTP";
    this.showVerifyOtpTextbox = true;
    return false;
  }

  onMobileNoChange() {
    this.showVerifyOtpTextbox = this.signupForm.get('mobile_no').valid;
  }

  //Custom Methods

  private reset() {
    this.signup.registration_type = null;
    this.signup.social_type = null;
    this.signup.firstname = null;
    this.signup.lastname = null;
    this.signup.email = null;
    this.signup.mobile_no = null;
  }

  @Input()
  authConfig: any;

  linkedinLogin() {
    this._socialService.auth('linkedin',this.config);
  }
  facebookLogin(){
    this._socialService.auth('facebook',this.config);
  }
  googleLogin(){
    this._socialService.auth('google',this.config);
  }
}
