import {LandingModule} from './landing/landing.module';
import {AssetDetailsModule} from './asset-details/asset-details.module';
import {CustomerModule} from './customer/customer.module';
import {TariffModule} from './tariff/tariff.module';
import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {SrvAccountModule} from './srv-account/srv-account.module';

@NgModule({
    imports: [
        NbMenuModule,
        PagesRoutingModule,
        ThemeModule,
        TariffModule,
        CustomerModule,
        AssetDetailsModule,
        LandingModule,
        MiscellaneousModule,
        SrvAccountModule,
    ],
    declarations: [PagesComponent],
})
export class PagesModule {
}
