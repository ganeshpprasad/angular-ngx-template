import {Observable} from 'rxjs';

export interface ISiteDetailsData {
    project_number: string,
    sub_project_number: string,
    cable_identity: string,
    parent_cable_identity: string,
    parent_indicator: boolean,
    main_cable_identity: string,
    max_power_requirement: string,
    special_access: string,
    idle_service_date: string,
    plot_no: string,
    description: string,
    property_type: string,
    supply_capacity: string,
    supply_voltage: string,
    number_of_phases: number,
    phase_combination: string,
    ref_2_plan: string,
    site_address: {
        line_1: string,
        line_2: string,
        line_3: string,
        line_4: string,
        line_5: string,
        line_6: string,
        line_7: string,
        postcode: string
    },
    site_contact_details: {
        name: string,
        telephone: string,
        fax: string,
    },
}


export abstract class ISiteDetailsAPIService {
    abstract getSiteDetails(): Observable<ISiteDetailsData>;
}