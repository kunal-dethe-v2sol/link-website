import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ThreadsService } from './../threads.service';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {

  //Variables
  form;
  connections = [];
  values = '';


  //Constructor parameters
  static get parameters() {
    return [
      ThreadsService,
      ActivatedRoute,
      Router
    ];
  }

  //Constructor
  constructor(private _threadsService, private _route, private _router) { }

  ngOnInit() {
    this.form = new FormGroup({
      user_ids: new FormControl("", Validators.required),
      header: new FormControl("", Validators.required),
      message: new FormControl("", Validators.required),
      image: new FormControl(""),
      file: new FormControl(""),
    });
  }

  //Connection Search - Uses new-thread.service - Searches connections to create a thread.
  connectionSearch(event: any) {
    this.values = event.target.value;
    this._threadsService.connectionSearch(this.values)
      .subscribe(
      response => {
        this.connections = response[0]['user_connections'];
      }
      );
  }

  //Create new thread - Post header and messages to create new thread.
  newThread(value) {
    let postData = JSON.stringify(value);
    this._threadsService
      .postNewThread(postData)
      .subscribe(
      response => {
        this._threadsService.refreshThreadListEventEmitter.emit();
        console.log(response);
      }
      );
  }


}
