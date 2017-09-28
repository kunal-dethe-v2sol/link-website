import {Component, OnInit, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {SharedService} from './../shared/service/shared.service';
import {LoginService} from './login.service';
import {SocialService} from './../social/social.service';

@Component({
    selector: 'linkcxo-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    //Variables
    loginForm: FormGroup;
    email: FormControl;
    password: FormControl;
    code;

    //Constructor parameters
    static get parameters() {
        return [
            LoginService,
            SharedService,
            Router,
            ActivatedRoute,
            SocialService,
            Location
        ];
    }

    //Constructor
    constructor(private _loginService,
        private _sharedService,
        private _router,
        private _activeroute,
        private _socialService,
        private _location) {

        //let params = new URLSearchParams(this._location.path(false).split('?')[1]);
        this._activeroute
            .queryParams
            .subscribe(params => {
                this.code = params['code'];
                console.log('code : ', this.code);
            });
        //console.log('gmail code  : ', this.code);
        if (this.code) {
            this._socialService.getSocialDetails(this.code)
                .subscribe(
                response => {
                    console.log('response', response);

                },
                error => {
                    console.log('error: ', error);
                });
        }
    }

    //Angular Hooks
    ngOnInit() {
        this.createFormControls();
        this.createForm();

    }
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
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.password = new FormControl('', [
            Validators.required,
            //Validators.pattern('/^[0-9]{10,10}$/'),
            Validators.maxLength(10)
        ]);
    }

    createForm() {
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password,
        });
    }

    onSubmit(data): void {
        console.log('login', data);
        this._loginService.login(data)
            .subscribe(
            response => {
                console.log('response', response);
                if (typeof response.errors != "undefined") {
                    //server error message
                    console.log('response', response.errors.mobile_no);
                } else {
                    if (response) {
                        this._sharedService.getAuthService().login(response[0]);
                        this._sharedService.loginEventEmitter.emit(true);
                        this._router.navigate(['home']);
                    }
                }
            },
            error => {
                console.log('error: ', error);
            });
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
