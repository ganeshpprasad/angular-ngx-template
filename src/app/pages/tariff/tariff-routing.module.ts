import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TariffComponent} from './tariff.component';
import {TariffSearchComponent} from './tariff-search/tariff-search.component';

export const routes: Routes = [
    {
        path: '',
        component: TariffComponent,
        children: [
            // {
            //     path: ':id',
            //     component: CustomerDetailsComponent,
            // },
            {
                path: '',
                component: TariffSearchComponent,
            },
        ],
    },
];
export const routedComponents = [
    TariffComponent,
    TariffSearchComponent,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TariffRoutingModule {
}
