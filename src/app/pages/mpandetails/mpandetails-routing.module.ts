import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MPANDetailsComponent} from "./mpandetails.component";
import {MpanDetailsFormComponent} from "./mpan-details-form/mpan-details-form.component";


const routes: Routes = [{
    path: '',
    component: MPANDetailsComponent,
    children: [{
        path: ':id',
        component: MpanDetailsFormComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MpanDetailsRoutingModule {
}

export const routedComponents = [
    MPANDetailsComponent,
    MpanDetailsFormComponent
];
