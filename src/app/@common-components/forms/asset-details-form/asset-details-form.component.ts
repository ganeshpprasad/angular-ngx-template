import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'ngx-asset-details-form',
    templateUrl: './asset-details-form.component.html',
    styleUrls: ['./asset-details-form.component.scss'],
})
export class AssetDetailsFormComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() isReadOnly: boolean = true;

    get rawFormValue(): any {
        return this.form.getRawValue();
    }

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
