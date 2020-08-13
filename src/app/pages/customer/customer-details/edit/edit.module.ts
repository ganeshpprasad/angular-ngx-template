import { NgModule } from "@angular/core";
import { EditComponent } from "./edit.component";
import { NbInputModule } from "@nebular/theme";
import { NbMenuModule } from "@nebular/theme";

@NgModule({
  imports: [NbInputModule, NbMenuModule],

  declarations: [EditComponent],
})
export class CustomerModule {}
