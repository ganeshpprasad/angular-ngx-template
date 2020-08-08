import { CustomerComponent } from "./customer.component";
import {
  NbCardModule,
  NbSearchModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbListModule,
  NbUserModule,
} from "@nebular/theme";

import { NgModule } from "@angular/core";
import { Ng2SmartTableModule } from "ng2-smart-table";
@NgModule({
  imports: [
    NbCardModule,
    NbSearchModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbUserModule,
    Ng2SmartTableModule,
  ],

  declarations: [CustomerComponent],
})
export class CustomerModule {}
