import { EditComponent } from "./edit/edit.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerComponent } from "./customer.component";
import { RouterModule } from "@angular/router";
import { NbMenuModule } from "@nebular/theme";
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
    CustomerRoutingModule,
    RouterModule,
    NbMenuModule,
  ],

  declarations: [CustomerComponent, EditComponent],
})
export class CustomerModule {}
