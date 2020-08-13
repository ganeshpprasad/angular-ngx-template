import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'ngx-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() isReadOnly: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

    getFieldStatus(fieldCtrlName: string) {
        let fieldStatus = this.isReadOnly ? '' : 'info';

        fieldStatus = this.form.get(fieldCtrlName).dirty ? 'success' : fieldStatus;
        fieldStatus = this.form.get(fieldCtrlName).invalid ? 'danger' : fieldStatus;
        return fieldStatus;
    }

}
