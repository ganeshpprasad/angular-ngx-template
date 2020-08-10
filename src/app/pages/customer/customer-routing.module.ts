import { EditComponent } from "./edit/edit.component";
import { CustomerComponent } from "./customer.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    children: [
      {
        path: "edit",
        component: EditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
