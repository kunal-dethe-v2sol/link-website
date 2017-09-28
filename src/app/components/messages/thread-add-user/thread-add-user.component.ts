import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Router, ActivatedRoute } from '@angular/router';
import { ThreadsService } from './../threads.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface ConfirmModel {
  title: string;
}

@Component({
  selector: 'app-thread-add-user',
  templateUrl: './thread-add-user.component.html',
  styleUrls: ['./thread-add-user.component.css']
})
export class ThreadAddUserComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {

  //Variables
  title: string;
  users = [];
  connections = [];
  form;
  header;
  values = '';
  thread_id;

  //Constructor parameters
  static get parameters() {
    return [
      ThreadsService,
      ActivatedRoute,
      Router,
      DialogService
    ];
  }

  //Constructor
  constructor(private _threadsService, private _route, private _router, public dialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      user_ids: new FormControl("", Validators.required)
    });
  }

  // we set dialog result as true on click on confirm button, 
  // then we can get dialog result from caller code
  confirm() {
    this.result = true;
    this.close();
  }

  //Connection Search - Uses new-thread.service - Searches connections to create a thread.
  connectionSearch(event: any) {
    this.values = event.target.value;
    console.log('search values', this.values);
    if (this.values) {
      this._threadsService.connectionSearch(this.values)
        .subscribe(
        response => {
          this.connections = response[0]['user_connections'];
        }
        );
    } else {
      this.connections = [];
    }
  }

  //Add Users - Add users to the current thread.
  add(value) {
    //let postData = JSON.stringify(value);
    let post = {
      user_ids: value.user_ids
    }
    this._threadsService.postNewUsers(this.thread_id, post)
      .subscribe(
      response => {
        console.log('response', this.thread_id);
        console.log('response', post);
        console.log('response', response);
      }
      );
  }

}
