import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutes } from './set-password.routes';
import { SetPasswordComponent } from './set-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetPasswordService } from './set-password.service';

@NgModule({
  declarations: [
    SetPasswordComponent
  ],
  imports: [
    CommonModule,
    SetPasswordRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SetPasswordService]
})
export class SetPasswordModule { }
