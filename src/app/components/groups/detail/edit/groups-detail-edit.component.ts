import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GroupsService} from './../../groups.service';
import {SharedService} from './../../../shared/service/shared.service';

@Component({
    selector: 'linkcxo-groups-detail-edit',
    templateUrl: './groups-detail-edit.component.html'
})
export class GroupsDetailEditComponent implements OnInit {

    //Variables
    public form: FormGroup;
    public group_id = '';
    public group: any = [];
    
    @ViewChild('image') image;

    //Constructor parameters
    static get parameters() {
        return [
            Router,
            ActivatedRoute,
            SharedService,
            GroupsService,
            FormBuilder
        ];
    }

    //Constructor
    constructor(
        private _router,
        private _activatedRoute,
        private _sharedService,
        private _groupsService,
        private _fb) {

        //This value is set from the GroupsCanActivateService.
        this.group = this._groupsService.getGroupsDetailEntity();
        
        this.group_id = this.group.uuid;

        this.prepareForm();
    }

    //Angular Hooks
    ngOnInit() {
        
    }

    //Custom Methods
    prepareForm() {
        this.form = this._fb.group({
            name: [this.group.name, []],
            image: ['', []],
            about: [this.group.about, []],
            visibility: [this.group.visibility.toLowerCase(), []],
            post_approval_required: [this.group.post_approval_required == 'yes' ? true : false, []]

            //            name: ['', [Validators.required]],
            //            image: ['', []],
            //            about: ['', [Validators.required]],
            //            visibility: ['public', [Validators.required]],
//                        post_approval_required: ['', []]
        });
    }

    //    onImageChange($event) {
    //        this.form.controls['image'].setValue($event.target.files[0]); // <-- Set Value for Validation
    //    }

    onSubmit() {
        var formValues = this.form.value;
        console.log('this.form', this.form);
        console.log('this.form.value', this.form.value);
        console.log('formValues', formValues);
        
        var group = {
            name: formValues.name,
            image: formValues.image,
            about: formValues.about,
            visibility: formValues.visibility,
            post_approval_required: formValues.post_approval_required ? 'yes' : 'no',
        }
        console.log('group', group);

        this._groupsService
            .edit(this.group_id, group)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this._router.navigate(['groups']);
            },
            error => {
                console.log('error: ', error);
            });
    }
}
