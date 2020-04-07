import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ThemeModule} from "../@theme/theme.module";
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule,
    NbSearchModule, NbSelectModule,
    NbTabsetModule, NbTooltipModule,
    NbUserModule, NbWindowModule
} from "@nebular/theme";
import {AssetDetailsFormComponent} from "./forms/asset-details-form/asset-details-form.component";
import { AddressFormComponent } from './forms/address-form/address-form.component';
import {FormTextInputComponent} from "./form-inputs/form-text-input/form-text-input.component";

const ENTRY_COMPONENTS = [];

const EXPORT_COMPONENTS = [
    AssetDetailsFormComponent,
    AddressFormComponent,
    FormTextInputComponent,
];

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
        NbDatepickerModule,
        NbCheckboxModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NbTooltipModule,
        NbWindowModule.forChild(),
    ],
    declarations: [
        ...ENTRY_COMPONENTS, ...EXPORT_COMPONENTS,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
    exports: [
        ...EXPORT_COMPONENTS,
    ],
})
export class CommonComponentsModule {
}
