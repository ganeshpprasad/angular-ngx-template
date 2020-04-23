import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MPANReportComponent} from './mpanreport.component';
import {MpanReportViewComponent} from './mpan-report-view/mpan-report-view.component';


const routes: Routes = [{
    path: '',
    component: MPANReportComponent,
    children: [
        {
            path: '',
            component: MpanReportViewComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MpanReportRoutingModule {
}

export const routedComponents = [
    MPANReportComponent,
    MpanReportViewComponent,
];
