import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HHProfileService} from "./hhprofile.service";
import {AuthGuard} from "./auth-guard.service";
import {TimeProfileService} from "./timeprofile.service";
import {MPANDetailsMockService} from "./mpan-mock.service";

const SERVICES = [
    HHProfileService,
    TimeProfileService,
    AuthGuard,
    MPANDetailsMockService,
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