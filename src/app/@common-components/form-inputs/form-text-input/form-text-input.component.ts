import {Component, Input, OnInit} from '@angular/core';
import {IFieldAttributes} from '../../../@providers/data/form-data/mpandetailsform';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'ngx-form-text-input',
    template: `
        <div class="form-group col-sm-12">
            <label class="label col-sm-3 col-form-label">
                {{formFieldAttributes.label}}</label>
            <div class="col-sm-9">
                <input type="text"
                       class="input-full-width size-medium shape-semi-round"
                       nbInput
                       fullWidth
                       nbTooltipStatus="info"
                       [placeholder]="formFieldAttributes.placeholder"
                       [readonly]="formFieldAttributes.isReadOnly"
                       [nbTooltip]="formFieldAttributes.tooltip"
                       [formControlName]="formFieldAttributes.formControlName"
                       [status]="fieldStatus">
            </div>
        </div>
    `,
    styleUrls: ['./form-text-input.component.scss'],
})
export class FormTextInputComponent implements OnInit {

    @Input() formFieldAttributes: IFieldAttributes;
    @Input() formGrpForControl: AbstractControl; // Form group to which control belongs
    formControl: AbstractControl; // form control extracted from group

    constructor() {
    }

    ngOnInit() {
        this.formControl = this.formGrpForControl.get(this.formFieldAttributes.formControlName);
    }

    get fieldStatus() {
        let fieldStatus = this.formFieldAttributes.isReadOnly ? '' : 'warning';

        fieldStatus = this.formControl.dirty ? 'success' : fieldStatus;
        fieldStatus = this.formControl.invalid ? 'danger' : fieldStatus;
        return fieldStatus;
    }

}
