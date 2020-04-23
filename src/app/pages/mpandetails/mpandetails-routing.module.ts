import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MPANDetailsComponent} from './mpandetails.component';
import {MpanDetailsFormComponent} from './mpan-details-form/mpan-details-form.component';
import {MpanDetailsSearchComponent} from './mpan-details-search/mpan-details-search.component';
import {BulkImportComponent} from './bulk-import/bulk-import.component';
import {BulkImportResultComponent} from './bulk-import-result/bulk-import-result.component';


const routes: Routes = [{
    path: '',
    component: MPANDetailsComponent,
    children: [
        {
            path: ':id',
            component: MpanDetailsFormComponent,
        },
        {
            path: '',
            component: MpanDetailsSearchComponent,
        },
        {
            path: 'bulk_import_result/:id',
            component: BulkImportResultComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MpanDetailsRoutingModule {
}

export const routedComponents = [
    MPANDetailsComponent,
    MpanDetailsSearchComponent,
    MpanDetailsFormComponent,
    BulkImportComponent,
    BulkImportResultComponent,
];
