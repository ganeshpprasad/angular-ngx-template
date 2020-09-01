import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AuthGuard} from './services/auth-guard.service';
import {TimeProfile} from './data/timeprofile';
import {TimeProfileService} from './services/timeprofile.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggingInterceptor} from './interceptors/logging-interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error-interceptor';
import {ICustomerDetailsAPIService} from './data/customer-details';
import {CustomerDetailsService} from './services/customer-details.service';
import {IServiceAccountDetailsAPIService} from './data/service-account';
import {ServiceAccountService} from './services/service-account.service';
import {IBillInvoiceDetailsAPIService} from './data/bill-invoice';
import {BillInvoiceService} from './services/bill-invoice.service';
import {TokenHeaderInterceptor} from './interceptors/token-header-interceptor';
import {IBillTransactionAPIService} from './data/bill-transaction';
import {BillTransactionService} from './services/bill-transaction.service';


const DATA_SERVICES = [
    {provide: TimeProfile, useClass: TimeProfileService},
    {provide: AuthGuard, useClass: AuthGuard},
    {provide: ICustomerDetailsAPIService, useClass: CustomerDetailsService},
    {provide: IServiceAccountDetailsAPIService, useClass: ServiceAccountService},
    {provide: IBillInvoiceDetailsAPIService, useClass: BillInvoiceService},
    {provide: IBillTransactionAPIService, useClass: BillTransactionService},
];

const NGX_HTTP_INTERCEPTORS = [
    {provide: HTTP_INTERCEPTORS, useClass: TokenHeaderInterceptor, multi: true},
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
