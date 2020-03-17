import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import {HHProfileModule} from "./hhprofile/hhprofile.module";
import {TimeProfileModule} from "./timeprofile/timeprofile.module";

@NgModule({
    imports: [
        NbMenuModule,
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
        HHProfileModule,
        TimeProfileModule
    ],
    declarations: [
        PagesComponent,
    ],
})
export class PagesModule {
}
