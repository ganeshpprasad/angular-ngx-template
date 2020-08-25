import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-reset-pasword",
  templateUrl: "./reset-pasword.component.html",
  styleUrls: ["./reset-pasword.component.scss"],
})
export class ResetPaswordComponent implements OnInit {
  MIN_PASS_LENGTH = 5;
  oldPassword = {
    value: "",
    dirty: false,
    invalid: false,
    touched: false,
    errors: {
      minLength: false,
    },
  };
  newPassword = {
    value: "",
    dirty: false,
    invalid: false,
    touched: false,
    errors: {
      minLength: false,
    },
  };
  submitted = false;

  constructor() {}

  ngOnInit() {}

  reset() {}
}
