import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ValidationExtensions} from 'ng2-mdf-validation-messages';

import {GroupsService} from './../groups.service';
import {SharedService} from './../../shared/service/shared.service';

@Component({
    selector: 'linkcxo-groups-new',
    templateUrl: './groups-new.component.html'
})
export class GroupsNewComponent implements OnInit {

    //Variables
    public form: FormGroup;
    public name: FormControl;
    public about: FormControl;
    public visibility: FormControl;

    public showBusyConnections = true;
    public connections = [];
    public selectedConnections = [];

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


    }

    //Angular Hooks
    ngOnInit() {
        this.getConnectionList();

        this.prepareForm();
    }

    //Custom Methods
    /**
     *   //@TODO - remove this code later
     *   //It is only for sample purpose.
     *   //To display server side validation messages below the field.
     *   this.FIELD_NAME.setErrors({
     *       remote: {
     *           message: 'Custom validation from server side'
     *       }
     *   });
     */
    prepareForm() {
        this.name = this._fb.control('', [
            ValidationExtensions.required(),
            //ValidationExtensions.email(),
            ValidationExtensions.noEmpty(),
            ValidationExtensions.minLength(3),
            ValidationExtensions.maxLength(5),
            this._sharedService.getCustomValidationService().alphaNumeric()
        ]);
        this.about = this._fb.control('', [ValidationExtensions.required()]);
        this.visibility = this._fb.control('public', [ValidationExtensions.required()]);

        this.form = this._fb.group({
            name: this.name,
            image: this.image,
            about: this.about,
            visibility: this.visibility
        });
    }

    getConnectionList() {
        this.connections = [];
        this.showBusyConnections = true;

        this._groupsService
            .getConnectionList()
            .subscribe(
            response => {
                this.showBusyConnections = false;
                this.connections = response[0];
            },
            error => {
                console.log('error: ', error);
                this.showBusyConnections = false;
            });
    }

    searchConnectionList($event) {
        var search = $event.srcElement.value;
        if (search) {
            this.connections = [];
            this.showBusyConnections = true;

            this._groupsService
                .searchConnectionList(search)
                .subscribe(
                response => {
                    this.showBusyConnections = false;
                    this.connections = response[0];
                },
                error => {
                    console.log('error: ', error);
                    this.showBusyConnections = false;
                });
        } else {
            this.getConnectionList();
        }
    }

    saveSelectedConnection($event, user_connection) {
        if ($event.srcElement.checked) {
            this.selectedConnections.push(user_connection);
        } else {
            let updateItem = this.selectedConnections.find(this.findIndexToUpdate, user_connection.uuid);
            let index = this.selectedConnections.indexOf(updateItem);
            this.selectedConnections.splice(index, 1);
        }
    }

    findIndexToUpdate(user_connection) {
        return user_connection.uuid === this;
    }

    onSubmit() {
        var formValues = this.form.value;
        //        console.log('this.form', this.form);
        //        console.log('this.form.value', this.form.value);
        //        console.log('formValues', formValues);

        var selectedConnectionIds: any = [];
        if (this.selectedConnections.length) {
            for (var x in this.selectedConnections) {
                selectedConnectionIds.push(this.selectedConnections[x].user.uuid);
            }
        }

        var group = new FormData();
        group.append("name", formValues.name);
        group.append("about", formValues.about);
        group.append("visibility", formValues.visibility);
        group.append("member_ids", selectedConnectionIds);

        //        console.log('group', group);

        let fileBrowser = this.image.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            group.append("image", fileBrowser.files[0]);
        }

        this._groupsService
            .new(group)
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
