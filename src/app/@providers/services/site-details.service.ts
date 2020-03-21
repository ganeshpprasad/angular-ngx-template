import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {ISiteDetailsAPIService, ISiteDetailsData} from "../data/sitedetails";

@Injectable()
export class SiteDetailsService extends ISiteDetailsAPIService {

    site_details: ISiteDetailsData = {
        project_number: 'PENL10010',
        sub_project_number: '11',
        cable_identity: 'GS002033020010123',
        parent_cable_identity: '',
        parent_indicator: false,
        main_cable_identity: '10NORW01/M011',
        max_power_requirement: '',
        special_access: '',
        idle_service_date: '',
        plot_no: '11',
        description: '',
        property_type: '',
        supply_capacity: '20',
        supply_voltage: '240',
        number_of_phases: 1,
        phase_combination: '1',
        ref_2_plan: '2010-12--239392',
        site_address: {
            line_1: '',
            line_2: '',
            line_3: '',
            line_4: '',
            line_5: '',
            line_6: '',
            line_7: '',
            postcode: ''
        },
        site_contact_details: {
            name: '',
            telephone: '',
            fax: '',
        }
    };

    getSiteDetails(): Observable<ISiteDetailsData> {
        return observableOf(this.site_details);
    }

}