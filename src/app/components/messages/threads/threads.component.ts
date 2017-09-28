import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ThreadAddUserComponent } from './../thread-add-user/thread-add-user.component';

import { DialogService } from "ng2-bootstrap-modal";
import { ThreadsService } from './../threads.service';
import { SharedService } from './../../shared/service/shared.service';

@Component({
    selector: 'app-threads',
    templateUrl: './threads.component.html',
    styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

    //Variables
    messages = [];
    users = [];
    threads = [];
    read_receipt_users = [];
    thread_id;
    form;
    header;
    loggedInUserId;

    @ViewChild('image') image;
    @ViewChild('file') file;

    //Constructor parameters
    static get parameters() {
        return [
            SharedService,
            ThreadsService,
            ActivatedRoute,
            Router,
            DialogService,
        ];
    }

    //Constructor
    constructor(private _sharedService, private _threadsService, private _route, private _router, private dialogService) {
        this._route.params.subscribe(
            params => {
                this.thread_id = params['uuid'];
                if (this.thread_id != 'new') {
                    //console.log('calling messages', this.thread_id);
                    this.getThread(this.thread_id);
                    this.getMessages();
                }
            }
        );
        this.loggedInUserId = this._sharedService.getLoggedInUserData().uuid;
    }

    //Angular Hooks
    ngOnInit() {
        this.form = new FormGroup({
            message: new FormControl(""),
            //image: new FormControl(""),
            //file: new FormControl("")
        });
    }

    //Get threads Modal Box
    showConfirm() {
        let disposable = this.dialogService.addDialog(ThreadAddUserComponent, {
            title: 'Confirm title',
            thread_id: this.thread_id
        })
            .subscribe((isConfirmed) => {
                //We get dialog result
                if (isConfirmed) {
                    alert('accepted');
                }
                else {
                    alert('declined');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        /*setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);*/
    }

    //Get all threads - calls the method list
    getThread(thread_id) {
        this._threadsService.getThread(this.thread_id)
            .subscribe(
            response => {
                console.log('response', response);
                this.users = response[0]['users'];
                this.header = response[0]['header'];
                console.log('response', this.users);
            }
            );
    }

    //Get Messages and Read Receipt - Gets all the messages and the read receipt of the read messages.
    getMessages() {
        this._threadsService
            .getMessages(this.thread_id)
            .subscribe(
            response => {
                this.messages = response[0]['messages'];
                this.read_receipt_users = response[0]['read_receipt_users'];
                //console.log('Message & read receipt:', response);
            }
            );
        /*setInterval(() => {
            this.getMessages();
        }, 10000);*/
    }

    //Send Messages - Send the messages in the current threads.
    onSubmit(value) {
        var postData = new FormData();
        postData.append("message", value.message);
        postData.append("thread_id", this.thread_id);

        let fileBrowser = this.image.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            postData.append("image", fileBrowser.files[0]);
        }
        let fileBrowser1 = this.file.nativeElement;
        if (fileBrowser1.files && fileBrowser1.files[0]) {
            postData.append("file", fileBrowser1.files[0]);
        }
        //console.log('postData:', postData);
        this._threadsService
            .postMessages(postData)
            .subscribe(
            response => {
                this.getMessages();
                this._threadsService.refreshThreadListEventEmitter.emit();
            }
            );
    }

    //Export messages - Exports all the text messages of the current thread.
    export(thread_id) {
        console.log(this.thread_id);
        this._threadsService.exportMessages(this.thread_id)
            .subscribe(
            response => {
                console.log("Messages Exported.");
            }
            );
    }

    blockUsers() {
        let post = {
            thread_id: [this.thread_id],
            status: 'blocked'
        }
        this._threadsService.delete(post)
            .subscribe(
            response => {
                console.log('response:', response);
                this.threads = response;
                console.log('response:', this.threads);
            }
            );
    }

    unblockUsers() {
        let post = {
            thread_id: [this.thread_id],
            status: 'active'
        }
        this._threadsService.delete(post)
            .subscribe(
            response => {
                console.log('response:', response);
                this.threads = response;
                console.log('response:', this.threads);
            }
            );
    }
}