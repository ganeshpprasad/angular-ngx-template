import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ProvidersModule} from "./@providers/providers.module";
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import {NbAuthModule, NbDummyAuthStrategy} from "@nebular/auth";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        NbAuthModule.forRoot({
            strategies: [
                NbDummyAuthStrategy.setup({
                    name: 'email',
                    delay: 500,
                }),
            ],
            forms: {},
        }),

        ThemeModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        CoreModule.forRoot(),
        ProvidersModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
