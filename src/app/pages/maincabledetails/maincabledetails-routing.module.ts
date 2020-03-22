import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainCableDetailsComponent} from "./maincabledetails.component";
import {MainCableDetailsFormComponent} from "./main-cable-details-form/main-cable-details-form.component";
import {MainCableDetailsSearchComponent} from "./main-cable-details-search/main-cable-details-search.component";


const routes: Routes = [{
    path: '',
    component: MainCableDetailsComponent,
    children: [
        {
            path: ':id',
            component: MainCableDetailsFormComponent,
        },
        {
            path: '',
            component: MainCableDetailsSearchComponent,
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainCableDetailsRoutingModule {
}

export const routedComponents = [
    MainCableDetailsComponent,
    MainCableDetailsFormComponent,
    MainCableDetailsSearchComponent,
];
