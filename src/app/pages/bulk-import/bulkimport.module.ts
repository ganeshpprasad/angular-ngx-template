import {NgModule} from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbListModule, NbProgressBarModule,
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
import {CommonComponentsModule} from '../../@common-components/common-components.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {BulkImportRoutingModule, routedComponents} from './bulkimport-routing.module';
import {MpanImportTaskTableRouteComponent} from './mpan-import-task-table-route/mpan-import-task-table-route.component';

const ENTRY_COMPONENTS = [MpanImportTaskTableRouteComponent];
const EXPORT_COMPONENTS = [MpanImportTaskTableRouteComponent];

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
        NbProgressBarModule,
        NbWindowModule.forChild(),
        CommonComponentsModule,
        BulkImportRoutingModule,
    ],
    declarations: [
        ...ENTRY_COMPONENTS, ...EXPORT_COMPONENTS, ...routedComponents,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
    exports: [
        ...EXPORT_COMPONENTS,
    ],
})
export class BulkImportModule {
}
