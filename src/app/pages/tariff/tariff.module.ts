import {TariffComponent} from './tariff.component';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule, NbCheckboxModule, NbIconModule,
    NbInputModule, NbListModule,
    NbMenuModule, NbRadioModule,
    NbSearchModule, NbSelectModule, NbSpinnerModule,
    NbTabsetModule, NbTooltipModule,
    NbUserModule,
} from '@nebular/theme';
import {NgModule} from '@angular/core';
import {routedComponents, TariffRoutingModule} from './tariff-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';

const ENTRY_COMPONENTS = [];
const EXPORT_COMPONENTS = [];

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
        NbCardModule,
        TariffRoutingModule,
    ],
    declarations: [
        ...ENTRY_COMPONENTS,
        ...routedComponents,
        ...EXPORT_COMPONENTS,
    ],
    entryComponents: [...ENTRY_COMPONENTS],
    exports: [...EXPORT_COMPONENTS],
})
export class TariffModule {
}
