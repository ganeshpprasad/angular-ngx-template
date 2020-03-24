import {Injectable} from "@angular/core";
import {IMPANDetailsFormService} from "../../data/form-data/mpandetailsform";
import {FormBuilder, FormGroup} from '@angular/forms';
import {IMPANDetailsData} from "../../data/mpandetails";


@Injectable()
export class MpanDetailsFormService implements IMPANDetailsFormService {
    public form: FormGroup;
    public mpan_form: FormGroup;

    private relatedLLFCForm = {
        mpan_fk: null,
        line_loss_factor_class_fk: null,
        effective_from: null,
        effective_to: null,
    };

    private relatedAddressForm = this.fb.group({
        address_type: null,
        address_1: null,
        address_2: null,
        address_3: null,
        address_4: null,
        address_5: null,
        address_6: null,
        address_7: null,
        address_8: null,
        address_9: null,
        post_code: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedMeasurementClassForm = this.fb.group({
        measurement_class_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedEnergisationForm = this.fb.group({
        state_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedMeterForm = this.fb.group({
        meter_fk: null,
        installation_date: null,
        removal_date: null,
    });

    private relatedMeterClassForm = this.fb.group({
        measurement_class_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedAscForm = this.fb.group({
        value: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedSscForm = this.fb.group({
        ssc_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatesMpan2Mpid2RoleForm = this.fb.group({
        market_participant_fk: null,
        role_fk: null,
        effective_from: null,
        effective_to: null,
    });

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
        });

        this.mpan_form = this.fb.group({
            id: null,
            unmetered: null,
            umso_reference: null,
            //
            ct_ratio: null,
            ct_class: null,
            ct_rating: null,
            vt_ratio: null,
            vt_class: null,
            vt_rating: null,
            export: null,
            unique_property_reference_number: null,
            plot_number: null,
            property_type: null,
            supply_voltage: null,
            supply_capacity: null,
            //
            mpan_address: this.relatedAddressForm,
            mailing_address: this.relatedAddressForm,
            asc: null,
            energisation: this.relatedEnergisationForm,
            llfc: this.relatedLLFCForm,
            mc: this.relatedMeasurementClassForm,
            meter: this.relatedMeterForm,
            //
            da_mpid: this.relatesMpan2Mpid2RoleForm,
            dc_mpid: this.relatesMpan2Mpid2RoleForm,
            mop_mpid: this.relatesMpan2Mpid2RoleForm,
            supplier_mpid: this.relatesMpan2Mpid2RoleForm,
            //
            ssc: this.relatedSscForm,
        });
    }

    // loader service for MPAN details
    public loadMPANDetails(mpanDetails: IMPANDetailsData) {
        this.form.patchValue({
            ...mpanDetails
        })
    }

}