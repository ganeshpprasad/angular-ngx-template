import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BulkImportComponent} from './bulk-import.component';
import {BulkImportResultComponent} from './bulk-import-result/bulk-import-result.component';
import {BulkImportRouterComponent} from './bulkimport.component';

const routes: Routes = [{
    path: '',
    component: BulkImportRouterComponent,
    children: [
        {
            path: '',
            component: BulkImportComponent,
        },
        {
            path: 'result/:id',
            component: BulkImportResultComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BulkImportRoutingModule {
}

export const routedComponents = [
    BulkImportRouterComponent,
    BulkImportComponent,
    BulkImportResultComponent,
];
