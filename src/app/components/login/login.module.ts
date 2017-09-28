import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginRoutes } from './login.routes';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { SocialComponent } from './../social/social.component';

@NgModule({
    declarations: [
        LoginComponent,
        //SocialComponent
    ],
    imports: [
        CommonModule,
        LoginRoutes,
        FormsModule,
        ReactiveFormsModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [LoginService]
})
export class LoginModule { }
