import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PrimaryInfoRoutes} from './primary-info.routes';
import { PrimaryInfoComponent} from './primary-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryInfoService } from './primary-info.service';

@NgModule({
  declarations: [
        PrimaryInfoComponent
  ],
  imports: [
    CommonModule,
    PrimaryInfoRoutes,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [PrimaryInfoService],
   bootstrap: [ PrimaryInfoComponent ]
})
export class PrimaryInfoModule { }
