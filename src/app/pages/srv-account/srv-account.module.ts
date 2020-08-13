import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbMenuModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {routedComponents, SrvAccountRoutingModule} from './srv-account-routing.module';
import {SrvAccountTableRouteComponent} from './srv-account-table-route/srv-account-table-route.component';
import {SrvAccountTypepieComponent} from './srv-account-typepie/srv-account-typepie.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {SrvAccountBillingpieComponent} from './srv-account-billingpie/srv-account-billingpie.component';

const ENTRY_COMPONENTS = [
    SrvAccountTableRouteComponent,
    SrvAccountTypepieComponent,
    SrvAccountBillingpieComponent,
];
const EXPORT_COMPONENTS = [
    SrvAccountTableRouteComponent,
    SrvAccountTypepieComponent,
    SrvAccountBillingpieComponent,
];


@NgModule({
    imports: [
        ThemeModule,
        NbMenuModule,
        NbInputModule,
        NbSearchModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbCheckboxModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NbTooltipModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NgxEchartsModule,
        SrvAccountRoutingModule,
    ],
    declarations: [
        ...ENTRY_COMPONENTS, ...routedComponents, ...EXPORT_COMPONENTS,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
    exports: [
        ...EXPORT_COMPONENTS,
    ],
})
export class SrvAccountModule {
}
