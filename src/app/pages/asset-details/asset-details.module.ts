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
    NbSelectModule,
    NbTabsetModule,
    NbUserModule,
    NbWindowModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routedComponents, AssetDetailsRoutingModule} from "./asset-details.routing.module";
import {CommonModule} from "../../@common/common.module";

const ENTRY_COMPONENTS = [
];

const EXPORT_COMPONENTS = [
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
        NbWindowModule.forChild(),
        CommonModule,
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