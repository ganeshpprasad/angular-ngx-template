import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {BulkImportComponent} from './mpandetails/bulk-import/bulk-import.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'bulk-import',
            component: BulkImportComponent,
        },
        {
            path: 'mpan-details',
            loadChildren: () => import('./mpandetails/mpandetails.module')
                .then(m => m.MPANDetailsModule),
        },
        {
            path: 'asset-details',
            loadChildren: () => import('./asset-details/asset-details.module')
                .then(m => m.AssetDetailsModule),
        },
        {
            path: 'main-cable-details',
            loadChildren: () => import('./maincabledetails/maincabledetails.module')
                .then(m => m.MainCableDetailsModule),
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
        {
            path: 'mpan-report',
            loadChildren: () => import('./mpan-report/mpanreport.module')
                .then(m => m.MPANReportModule),
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
