import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SignUpRoutes } from './signup.routes';
import { SignUpComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './signup.service';
import { SocialComponent } from './../social/social.component';

@NgModule({
    declarations: [
        SignUpComponent,
        //SocialComponent
    ],
    imports: [
        CommonModule,
        SignUpRoutes,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [SignupService]
})
export class SignUpModule { }
