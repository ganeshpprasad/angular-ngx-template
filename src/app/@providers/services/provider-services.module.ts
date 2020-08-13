import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "./auth-guard.service";
import {TimeProfileService} from "./timeprofile.service";

const SERVICES = [
    AuthGuard,
    TimeProfileService,
];


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ...SERVICES,
    ],
})
export class ProviderServicesModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ProviderServicesModule,
            providers: [
                ...SERVICES,
            ],
        };
    }
}