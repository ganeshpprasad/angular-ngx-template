import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from '@angular/forms';
import {ISiteDetailsFormService} from "../../data/form-data/sitedetailsform";
import {ISiteDetailsData} from "../../data/sitedetails";


@Injectable()
export class SiteDetailsFormService implements ISiteDetailsFormService {
    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            project_number: null,
            sub_project_number: null,
            cable_identity: null,
            parent_cable_identity: null,
            parent_indicator: null,
            main_cable_identity: null,
            max_power_requirement: null,
            special_access: null,
            idle_service_date: null,
            plot_no: null,
            description: null,
            property_type: null,
            supply_capacity: null,
            supply_voltage: null,
            number_of_phases: null,
            phase_combination: null,
            ref_2_plan: null,
            site_address: this.fb.group({
                line_1: null,
                line_2: null,
                line_3: null,
                line_4: null,
                line_5: null,
                line_6: null,
                line_7: null,
                postcode: null
            }),
            site_contact_details: this.fb.group({
                name: null,
                telephone: null,
                fax: null,
            }),
        });
    }

    public loadSiteDetails(siteDetails: ISiteDetailsData) {
        this.form.patchValue({
            ...siteDetails
        })
    }

}