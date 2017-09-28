import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GroupsService} from './../../groups.service';
import {SharedService} from './../../../shared/service/shared.service';

@Component({
    selector: 'linkcxo-groups-detail-discussion',
    templateUrl: './groups-detail-discussion.component.html'
})
export class GroupsDetailDiscussionComponent implements OnInit {

    //Variables
    public form: FormGroup;
    public group_id = '';
    public group: any = [];

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
            title: ['', []],
            image: ['', []],
            content: ['', []]

            //            title: ['', [Validators.required]],
            //            image: ['', []],
            //            content: ['', [Validators.required]]
        });
    }

    list() {
        
    }

    /**
     * @TODO - file upload is mandatory.
     */
    onSubmit() {
        var formValues = this.form.value;

        var post = {
            title: formValues.title,
            image: formValues.image,
            content: formValues.content,
            group_id: this.group_id
        }
        console.log('post', post);

        this._groupsService
            .newGroupPost(this.group_id, post)
            .subscribe(
            response => {
                this._sharedService.getToastrService().pop('success', 'Success', response[0]);
                this.list();
            },
            error => {
                console.log('error: ', error);
            });
    }
}
