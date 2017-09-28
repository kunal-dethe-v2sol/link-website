import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {SharedAuthService} from './shared-auth.service';

@Injectable()
export class SharedCanActivateAuthService implements CanActivate {

    //Variables


    //Constructor parameters
    static get parameters() {
        return [
            SharedAuthService
        ];
    }

    //Constructor
    constructor(
        private _sharedAuthService) {


    }

    //Custom Methods
    canActivate(): boolean {
        return this._sharedAuthService.isLoggedIn();
    }

}