import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PersonalRoutes} from './personal.routes';
import { PersonalComponent} from './personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalService } from './personal.service';
import { DatePickerModule } from 'ng2-datepicker';


@NgModule({
  declarations: [
        PersonalComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutes,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DatePickerModule 
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [PersonalService],
  bootstrap: [ PersonalComponent ]
})
export class PersonalModule { }
