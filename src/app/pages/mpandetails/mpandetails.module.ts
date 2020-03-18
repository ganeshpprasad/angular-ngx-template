import {NgModule} from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbRadioModule,
    NbSelectModule,
    NbTabsetModule,
    NbUserModule,
    NbWindowModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {MPANDetailsComponent} from "./mpandetails.component";
import { MpanDetailsFormComponent } from './mpan-details-form/mpan-details-form.component';

const ENTRY_COMPONENTS = [
    MPANDetailsComponent,
];

@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NbWindowModule.forChild(),
    ],
    declarations: [
        MPANDetailsComponent,
        MpanDetailsFormComponent,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
})
export class MPANDetailsModule {
}
