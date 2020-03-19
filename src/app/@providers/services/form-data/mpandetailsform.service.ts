import {Injectable} from "@angular/core";
import {IMPANDetailsFormService} from "../../data/form-data/mpandetailsform";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMPANDetailsData} from "../../data/mpandetails";


@Injectable()
export class MpanDetailsFormService implements IMPANDetailsFormService {
    public form: FormGroup;

    constructor(private fb: FormBuilder) {

        this.form = this.fb.group({
            mpan_id: null,
            customer_name: null,
            site_cable_id: null,
            energisation_status: null,
            measurement_class: null,
            // customerDetails: this.fb.group({
            //     firstName: [null, Validators.required],
            //     lastName: [null, Validators.required],
            //     phoneNumber: [null, Validators.required],
            //     address: this.fb.group({
            //         street: [null, Validators.required],
            //         houseNum: [null, Validators.required],
            //         city: [null, Validators.required],
            //         floor: [null, Validators.required],
            //     })
            // })
        });
    }

    // loader service for MPAN details
    public loadMPANDetails(mpanDetails: IMPANDetailsData) {
        this.form.patchValue({
            ...mpanDetails
        })
    }

}