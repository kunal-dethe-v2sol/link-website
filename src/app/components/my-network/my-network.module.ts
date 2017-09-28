import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MyNetworkRoutes} from './my-network.routes';
//import { MyNetworkListComponent } from './list/connections-list.component';

@NgModule({
    declarations: [
        //    MyNetworkListComponent,
    ],
    imports: [
        CommonModule,
        MyNetworkRoutes,
    ],
    providers: [],
})
export class MyNetworkModule {}
