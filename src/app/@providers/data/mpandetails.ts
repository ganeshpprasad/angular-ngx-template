import {Observable} from 'rxjs';

export interface IMPANDetailsData {
    mpan_id: string,
    customer_name: string,
    site_cable_id: string,
    energisation_status: string,
    efd_energisation: string,
    measurement_class: string,
    line_loss_factor_class_id: string,
    llfc_effective_settlement_date: string,
    export_mpan: boolean,
    unmetered: boolean,
    std_settlement_id: string,
    effective_from_scon: string,
    customer_pwd: string,
    customer_pwd_efd: string,
    special_needs_code: string,
    efd_special_needs: string,
    special_needs_disc: string,
    umso_ref: string,
    conn_date: string,
    disconn_date: string,
    cont_supply_indicator: boolean,
    meter_point_address: {
        line_1:string,
        line_2:string,
        line_3:string,
        line_4:string,
        line_5:string,
        line_6:string,
        line_7:string,
    },
    mailing_address: {
        line_1:string,
        line_2:string,
        line_3:string,
        line_4:string,
        line_5:string,
        line_6:string,
        line_7:string,
    },
}

export abstract class IMPANDetailsAPIService {
    abstract getMpanDetails(): Observable<IMPANDetailsData>;
}