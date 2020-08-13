import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NgxAuthRoutingModule, routedComponents} from './auth-routing.module';
import {NbAuthModule} from '@nebular/auth';
import {NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule} from '@nebular/theme';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NbIconModule,
        NgxAuthRoutingModule,

        NbAuthModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class NgxAuthModule {
}
