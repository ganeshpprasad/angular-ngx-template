import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'ngx-asset-details-form',
    templateUrl: './asset-details-form.component.html',
    styleUrls: ['./asset-details-form.component.scss']
})
export class AssetDetailsFormComponent implements OnInit {

    @Input() form: FormGroup;

    get rawFormValue(): any {
        return this.form.getRawValue();
    }

    constructor() {
    }

    ngOnInit() {
    }

}
