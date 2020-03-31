import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'ngx-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() isReadOnly: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

}
