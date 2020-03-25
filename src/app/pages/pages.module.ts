import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import {TimeProfileModule} from "./timeprofile/timeprofile.module";
import {MPANDetailsModule} from "./mpandetails/mpandetails.module";
import {SiteDetailsModule} from "./sitedetails/sitedetails.module";
import { BulkImportComponent } from './mpandetails/bulk-import/bulk-import.component';

@NgModule({
    imports: [
        NbMenuModule,
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
        TimeProfileModule,
        MPANDetailsModule,
        SiteDetailsModule,
    ],
    declarations: [
        PagesComponent,
    ],
})
export class PagesModule {
}
