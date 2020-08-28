import { Component } from "@angular/core";
import { NbResetPasswordComponent, NbAuthService } from "@nebular/auth";

@Component({
  selector: "ngx-reset-pasword",
  templateUrl: "./reset-pasword.component.html",
  styleUrls: ["./reset-pasword.component.scss"],
})
export class ResetPaswordComponent extends NbResetPasswordComponent {}
