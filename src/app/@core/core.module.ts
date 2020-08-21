import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    NbAuthJWTToken,
    NbAuthModule,
    NbAuthSimpleToken,
    NbDummyAuthStrategy,
    NbPasswordAuthStrategy,
} from '@nebular/auth';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AnalyticsService, LayoutService, PlayerService, StateService} from './utils';
import {UserData} from './data/users';

import {UserService} from './mock/users.service';
import {MockDataModule} from './mock/mock-data.module';


const DATA_SERVICES = [
    {provide: UserData, useClass: UserService},
];

export class NbSimpleRoleProvider extends NbRoleProvider {
    getRole() {
        // here you could provide any role based on any auth flow
        return observableOf('guest');
    }
}

export const NB_CORE_PROVIDERS = [
    ...MockDataModule.forRoot().providers,
    ...DATA_SERVICES,
    ...NbAuthModule.forRoot({
        strategies: [
            NbPasswordAuthStrategy.setup({
                name: 'email',
                baseEndpoint: '',
                login: {
                    endpoint: '/api/v1/auth/login',
                    method: 'post',
                    alwaysFail: false,
                    requireValidToken: false,
                    redirect: {
                        success: '/pages/landing',
                        failure: null,
                    },
                    defaultErrors: ['Login/Email combination is not correct, please try again.'],
                    defaultMessages: ['You have been successfully logged in!'],
                },
                logout: {
                    alwaysFail: false,
                    endpoint: null,
                    method: null,
                    redirect: {
                        success: '/auth/login',
                        failure: null,
                    },
                    defaultErrors: ['Something went wrong, please try again.'],
                    defaultMessages: ['You have been successfully logged out.'],
                },
                token: {
                    class: NbAuthJWTToken,
                    key: 'result.token', // <-- this parameter tells where to look for the token
                },
            })],
            // NbDummyAuthStrategy.setup({name: 'email'})],
        forms: {},
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,

    {
        provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
    },
    AnalyticsService,
    LayoutService,
    PlayerService,
    StateService,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        NbAuthModule,
    ],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS,
            ],
        };
    }
}
