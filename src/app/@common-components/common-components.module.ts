import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../@theme/theme.module';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule, NbCheckboxModule,
    NbDatepickerModule, NbDialogModule, NbIconModule,
    NbInputModule, NbListModule, NbRadioModule,
    NbSearchModule, NbSelectModule,
    NbTabsetModule, NbTooltipModule,
    NbUserModule, NbWindowModule,
} from '@nebular/theme';
import {AssetDetailsFormComponent} from './forms/asset-details-form/asset-details-form.component';
import {AddressFormComponent} from './forms/address-form/address-form.component';
import {FormTextInputComponent} from './form-inputs/form-text-input/form-text-input.component';
import {LlfcSelectionComponent} from './form-inputs/llfc-selection/llfc-selection.component';

const ENTRY_COMPONENTS = [
    LlfcSelectionComponent,
];

const EXPORT_COMPONENTS = [
    AssetDetailsFormComponent,
    AddressFormComponent,
    FormTextInputComponent,
    LlfcSelectionComponent,
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
        NbDialogModule.forChild(),
    ],
    declarations: [
        ...ENTRY_COMPONENTS, ...EXPORT_COMPONENTS,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
    exports: [
        ...EXPORT_COMPONENTS,
    ],
})
export class CommonComponentsModule {
}
