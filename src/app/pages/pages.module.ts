import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import {MPANDetailsModule} from "./mpandetails/mpandetails.module";
import {SiteDetailsModule} from "./sitedetails/sitedetails.module";

@NgModule({
    imports: [
        NbMenuModule,
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
        MPANDetailsModule,
        SiteDetailsModule,
    ],
    declarations: [
        PagesComponent,
    ],
})
export class PagesModule {
}
