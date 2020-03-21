import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteDetailsComponent} from "./sitedetails.component";
import {SiteDetailsFormComponent} from "./site-details-form/site-details-form.component";
import {SiteDetailsSearchComponent} from "./site-details-search/site-details-search.component";


const routes: Routes = [{
    path: '',
    component: SiteDetailsComponent,
    children: [
        {
            path: ':id',
            component: SiteDetailsFormComponent,
        },
        {
            path: '',
            component: SiteDetailsSearchComponent,
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SiteDetailsRoutingModule {
}

export const routedComponents = [
    SiteDetailsComponent,
    SiteDetailsFormComponent,
    SiteDetailsSearchComponent,
];
