import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, Component } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import nebular theme modules
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";

import { CoreModule } from "./@core/core.module";
import { ProvidersModule } from "./@providers/providers.module"; //APIs
import { ThemeModule } from "./@theme/theme.module"; // Theme config
import { AppRoutingModule } from "./app-routing.module"; // Routing
import { AppComponent } from "./app.component";
import { NbEvaIconsModule } from "@nebular/eva-icons";

// import { CustomerComponent } from './customer/customer.component';
// import { TariffComponent } from './tariff/tariff.component';
// import { AssetDetailsComponent } from './asset-details/asset-details.component'; // Component

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    CoreModule.forRoot(),
    ProvidersModule.forRoot(),
    NbEvaIconsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
