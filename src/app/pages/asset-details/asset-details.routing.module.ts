import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetDetailsComponent} from "./asset-details.component";


const routes: Routes = [{
    path: '',
    component: AssetDetailsComponent,
    children: [
        // {
        //     path: ':id',
        //     component: SiteDetailsFormComponent,
        // },
        // {
        //     path: '',
        //     component: SiteDetailsSearchComponent,
        // }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssetDetailsRoutingModule {
}

export const routedComponents = [
    AssetDetailsComponent,
];
