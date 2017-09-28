import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {SocialRoutes} from './social.routes';
import {SocialComponent} from './social.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ SocialService } from './social.service';

@NgModule({
  declarations: [
        SocialComponent
  ],
  imports: [
    CommonModule,
    SocialRoutes,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [SocialService]
  })
export class SocialModule { }
