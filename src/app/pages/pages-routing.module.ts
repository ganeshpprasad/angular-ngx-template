import {LandingComponent} from './landing/landing.component';
import {TariffComponent} from './tariff/tariff.component';
import {AssetDetailsComponent} from './asset-details/asset-details.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'customer',
                loadChildren: () =>
                    import('./customer/customer.module').then(
                        m => m.CustomerModule,
                    ),
            },
            {
                path: 'srv-account',
                loadChildren: () =>
                    import('./srv-account/srv-account.module').then(
                        m => m.SrvAccountModule,
                    ),
            },
            {
                path: 'landing',
                component: LandingComponent,
            },
            {
                path: 'asset-details',
                component: AssetDetailsComponent,
            },
            {
                path: 'tariffs',
                component: TariffComponent,
            },
            {
                path: '',
                redirectTo: 'landing',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
