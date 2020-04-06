import {NgModule} from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbRadioModule,
    NbSearchModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTooltipModule,
    NbUserModule,
    NbWindowModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MpanDetailsRoutingModule, routedComponents} from "./mpandetails-routing.module";
import {CommonComponentsModule} from "../../@common-components/common-components.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {MpanDetailsTableRouteComponent} from "./mpan-details-table-route/mpan-details-table-route.component";

const ENTRY_COMPONENTS = [MpanDetailsTableRouteComponent];
const EXPORT_COMPONENTS = [MpanDetailsTableRouteComponent];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
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
        NbWindowModule.forChild(),
        CommonComponentsModule,
        MpanDetailsRoutingModule,
    ],
    declarations: [
        ...ENTRY_COMPONENTS, ...routedComponents, ...EXPORT_COMPONENTS
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
    exports: [
        ...EXPORT_COMPONENTS,
    ],
})
export class MPANDetailsModule {
}
