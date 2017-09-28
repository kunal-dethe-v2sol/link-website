import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ExperienceComponent } from './experience.component';
import { ExperienceRoutes } from './experience.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperienceService } from './experience.service';

@NgModule({
  declarations: [
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutes,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ExperienceService],
  bootstrap: [ ExperienceComponent ]
})
export class ExperienceModule { }
