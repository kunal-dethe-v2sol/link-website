import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import { MyNetworkComponent } from './my-network.component';  

const routes: Routes = [
    //  { path: 'my-network', component: MyNetworkComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MyNetworkRoutes {}
