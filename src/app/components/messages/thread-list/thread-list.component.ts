import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ThreadsService } from './../threads.service';


@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  //Variables
  threads = [];
  values = '';
  thread_id = [];


  //Constructor parameters
  static get parameters() {
    return [
      ThreadsService,
      ActivatedRoute,
      Router
    ];
  }

  //Constructor
  constructor(private _threadsService, private _route, private _router) {
    this.getThreads();
    //Listens to the emit fired to change the main layout after login and logout.
    this._threadsService.refreshThreadListEventEmitter.subscribe(
      () => {
        this.getThreads();
      });
  }

  ngOnInit() {}

  check($event, id) {
    if ($event.srcElement.checked) {
      //console.log('response', id);
      this.thread_id.push(id);
    }
  }

  //Get all threads - calls the method list
  getThreads() {
    this._threadsService.getThreads()
      .subscribe(
      response => {
        this.threads = response[0]['threads'];
        if (this.threads.length) {
          this._router.navigate(['messages/threads/', this.threads[0].uuid]);
        } else {
          this._router.navigate(['/messages/new'], { skipLocationChange: true });
        }
      }
      );
  }

  //Search threads matching messages - calls the method search
  search(event: any) {
    this.values = event.target.value;
    this._threadsService.search(this.values)
      .subscribe(
      response => {
        this.threads = response[0]['threads'];
        this._router.navigate(['messages/threads/', this.threads[0].uuid]);
        console.log(this.threads);
      }
      );
  }

  //Delete threads - Delete selected threads
  deletethreads() {
    let post = {
      thread_id: this.thread_id,
      status: 'inactive'
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



