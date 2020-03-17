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
import {NgxEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {HHProfileComponent} from "./hhprofile.component";
import {ProfileListComponent} from "./profile-list/profile-list.component";
import {HHProfileFormComponent} from "./hhprofile-form/hhprofile-form.component";

const ENTRY_COMPONENTS = [
    HHProfileFormComponent,
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
        NgxEchartsModule,
        NbWindowModule.forChild(),
    ],
    declarations: [
        HHProfileComponent,
        HHProfileFormComponent,
        ProfileListComponent
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
})
export class HHProfileModule {
}
