import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {CustomerComponent} from './customer.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [
            {
                path: ':id',
                component: CustomerDetailsComponent,
            },
            {
                path: '',
                component: CustomerSearchComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerRoutingModule {
}
