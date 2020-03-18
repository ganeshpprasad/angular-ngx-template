import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {HHProfileComponent} from "./hhprofile/hhprofile.component";
import {TimeProfileComponent} from "./timeprofile/timeprofile.component";
import {MPANDetailsComponent} from "./mpandetails/mpandetails.component";

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'hh-profile',
            component: HHProfileComponent,
        },
        {
            path: 'time-profile',
            component: TimeProfileComponent,
        },
        {
            path: 'mpan-details',
            component: MPANDetailsComponent,
        },
        {
            path: 'charts',
            loadChildren: () => import('./charts/charts.module')
                .then(m => m.ChartsModule),
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
        {
            path: '**',
            component: NotFoundComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
