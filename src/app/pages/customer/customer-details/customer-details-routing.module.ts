import {CustomerDetailsComponent} from './customer-details.component';
import {EditComponent} from './edit/edit.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: CustomerDetailsComponent,
        children: [
            {
                path: 'edit',
                component: EditComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerDetailRoutingModule {
}
