import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {TimeProfileComponent} from "./timeprofile/timeprofile.component";

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'time-profile',
            component: TimeProfileComponent,
        },
        {
            path: 'mpan-details',
            loadChildren: () => import('./mpandetails/mpandetails.module')
                .then(m => m.MPANDetailsModule),
        },
        {
            path: 'site-details',
            loadChildren: () => import('./sitedetails/sitedetails.module')
                .then(m => m.SiteDetailsModule),
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
