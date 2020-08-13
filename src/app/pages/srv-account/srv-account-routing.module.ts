import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SrvAccountComponent} from './srv-account.component';
import {SrvAccountDetailsComponent} from './srv-account-details/srv-account-details.component';
import {SrvAccountSearchComponent} from './srv-account-search/srv-account-search.component';

export const routes: Routes = [
    {
        path: '',
        component: SrvAccountComponent,
        children: [
            {
                path: ':id',
                component: SrvAccountDetailsComponent,
            },
            {
                path: '',
                component: SrvAccountSearchComponent,
            },
        ],
    },
];
export const routedComponents = [
    SrvAccountComponent,
    SrvAccountDetailsComponent,
    SrvAccountSearchComponent,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SrvAccountRoutingModule {
}
