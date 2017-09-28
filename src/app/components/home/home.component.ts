import {Component, OnInit} from '@angular/core';

import {SharedService} from './../shared/service/shared.service';

@Component({
    selector: 'linkcxo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    //Variables

    //Constructor parameters
    static get parameters() {
        return [
            SharedService
        ];
    }

    //Constructor
    constructor(
        private _sharedService) {

        
    }

    //Angular Hooks
    ngOnInit() {
    }

    //Custom Methods
}
