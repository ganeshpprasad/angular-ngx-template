import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {HHProfile} from "./data/hhprofile";
import {HHProfileService} from "./services/hhprofile.service";
import {AuthGuard} from "./services/auth-guard.service";
import {TimeProfile} from "./data/timeprofile";
import {TimeProfileService} from "./services/timeprofile.service";
import {MPANDetails} from "./data/mpandetails";
import {MPANDetailsMockService} from "./services/mpan-mock.service";


const DATA_SERVICES = [
    {provide: HHProfile, useClass: HHProfileService},
    {provide: TimeProfile, useClass: TimeProfileService},
    {provide: AuthGuard, useClass: AuthGuard},
    {provide: MPANDetails, useClass: MPANDetailsMockService},
];


export const NB_CORE_PROVIDERS = [
    ...DATA_SERVICES,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [],
    declarations: [],
})
export class ProvidersModule {
    constructor(@Optional() @SkipSelf() parentModule: ProvidersModule) {
        throwIfAlreadyLoaded(parentModule, 'ProvidersModule');
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ProvidersModule,
            providers: [
                ...NB_CORE_PROVIDERS,
            ],
        };
    }
}
