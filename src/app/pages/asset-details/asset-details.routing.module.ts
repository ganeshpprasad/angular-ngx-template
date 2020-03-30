import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetDetailsComponent} from "./asset-details.component";
import {AssetDetailsViewComponent} from "./asset-details-view/asset-details-view.component";


const routes: Routes = [{
    path: '',
    component: AssetDetailsComponent,
    children: [
        {
            path: ':id',
            component: AssetDetailsViewComponent,
        },
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
    AssetDetailsViewComponent,
];
