import {NgModule} from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbRadioModule,
    NbSelectModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbUserModule,
    NbWindowModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SiteDetailsComponent} from "./sitedetails.component";
import { SiteDetailsFormComponent } from './site-details-form/site-details-form.component';

const ENTRY_COMPONENTS = [
    SiteDetailsComponent,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
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
    ],
    declarations: [
        SiteDetailsComponent,
        SiteDetailsFormComponent,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
})
export class SiteDetailsModule {
}
