import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ForgotPasswordRoutes} from './forgot-password.routes';
import {ForgotPasswordComponent} from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ ForgotPasswordService } from './forgot-password.service';

@NgModule({
  declarations: [
        ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutes,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule { }
