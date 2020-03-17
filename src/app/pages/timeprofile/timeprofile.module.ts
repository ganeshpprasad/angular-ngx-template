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
    NbSelectModule,
    NbTabsetModule,
    NbUserModule,
    NbWindowModule,
} from '@nebular/theme';
import {NgxEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {TimeProfileComponent} from "./timeprofile.component";
import {TimeProfileListComponent} from "./timeprofile-list/timeprofile-list.component";
import {TimeProfileViewComponent} from "./timeprofile-view/timeprofile-view.component";

const ENTRY_COMPONENTS = [];

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
        NbInputModule,
        NbCheckboxModule,
        NgxEchartsModule,
        NbWindowModule.forChild(),
    ],
    declarations: [
        TimeProfileComponent,
        TimeProfileListComponent,
        TimeProfileViewComponent,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
})
export class TimeProfileModule {
}
