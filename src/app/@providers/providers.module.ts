import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AuthGuard} from './services/auth-guard.service';
import {TimeProfile} from './data/timeprofile';
import {TimeProfileService} from './services/timeprofile.service';
import {IMPANDetailsAPIService} from './data/mpandetails';
import {MpanDetailsService} from './services/mpan-details.service';
import {ISiteDetailsAPIService} from './data/sitedetails';
import {SiteDetailsService} from './services/site-details.service';
import {IMainCableDetailsAPIService} from './data/main-cable-details';
import {MainCableDetailsService} from './services/main-cable-details.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggingInterceptor} from './interceptors/logging-interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error-interceptor';
import {IAssetDetailsAPIService} from './data/assetdetails';
import {AssetDetailsService} from './services/asset-details.service';
import {IMpanImportApiService} from './data/mpanimport';
import {MpanImportApiService} from './services/mpan-import.service';
import {IMpanReportApiService} from './data/mpanreport';
import {MpanReportService} from './services/mpan-report.service';
import {ILLFCSelectionService} from './data/llfcselection';
import {LlfcSelectionService} from './services/llfc-selection.service';


const DATA_SERVICES = [
    {provide: TimeProfile, useClass: TimeProfileService},
    {provide: AuthGuard, useClass: AuthGuard},
    {provide: IMPANDetailsAPIService, useClass: MpanDetailsService},
    {provide: IMpanImportApiService, useClass: MpanImportApiService},
    {provide: ISiteDetailsAPIService, useClass: SiteDetailsService},
    {provide: IMainCableDetailsAPIService, useClass: MainCableDetailsService},
    {provide: IAssetDetailsAPIService, useClass: AssetDetailsService},
    {provide: IMpanReportApiService, useClass: MpanReportService},
    {provide: ILLFCSelectionService, useClass: LlfcSelectionService},
];

const NGX_HTTP_INTERCEPTORS = [
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
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
                ...NGX_HTTP_INTERCEPTORS,
            ],
        };
    }
}
