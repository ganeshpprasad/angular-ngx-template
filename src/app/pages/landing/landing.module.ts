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
} from '@nebular/theme';
import {NgxEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';
import {StatusCardComponent} from './status-card/status-card.component';
import {FormsModule} from '@angular/forms';
import {LandingComponent} from './landing.component';

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
    ],
    declarations: [
        LandingComponent,
        StatusCardComponent,
    ],
})
export class LandingModule {
}