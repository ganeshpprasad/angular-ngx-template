import {NgModule} from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbListModule,
    NbRadioModule,
    NbSearchModule,
    NbSelectModule, NbSpinnerModule,
    NbTabsetModule,
    NbUserModule,
    NbWindowModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routedComponents, AssetDetailsRoutingModule} from "./asset-details.routing.module";
import {CommonComponentsModule} from "../../@common-components/common-components.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AssetDetailsTableRouteComponent} from "./asset-details-table-route/asset-details-table-route.component";

const ENTRY_COMPONENTS = [
    AssetDetailsTableRouteComponent,
];

const EXPORT_COMPONENTS = [
    AssetDetailsTableRouteComponent,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
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
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbWindowModule.forChild(),
        CommonComponentsModule,
        AssetDetailsRoutingModule,
    ],
    declarations: [
        ...ENTRY_COMPONENTS, ...routedComponents, ...EXPORT_COMPONENTS,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
    exports: [
        ...EXPORT_COMPONENTS,
    ],
})
export class AssetDetailsModule {
}
