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
            efd_energisation: null,
            measurement_class: null,
            line_loss_factor_class_id: null,
            llfc_effective_settlement_date: null,
            export_mpan: null,
            unmetered: null,
            std_settlement_id: null,
            effective_from_scon: null,
            customer_pwd: null,
            customer_pwd_efd: null,
            special_needs_code: null,
            efd_special_needs: null,
            special_needs_disc: null,
            umso_ref: null,
            conn_date: null,
            disconn_date: null,
            cont_supply_indicator: null,

            meter_point_address: this.fb.group({
                line_1: null,
                line_2: null,
                line_3: null,
                line_4: null,
                line_5: null,
                line_6: null,
                line_7: null,
            }),
            mailing_address: this.fb.group({
                line_1: null,
                line_2: null,
                line_3: null,
                line_4: null,
                line_5: null,
                line_6: null,
                line_7: null,
            }),
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