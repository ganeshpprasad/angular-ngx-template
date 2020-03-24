import {Observable} from 'rxjs';

export interface IRelatedLLFC {
    mpan_fk: string,
    line_loss_factor_class_fk: string,
    effective_from: string,
    effective_to: string,

}

export interface IRelatedAddress {
    address_type: string,
    address_1: string,
    address_2: string,
    address_3: string,
    address_4: string,
    address_5: string,
    address_6: string,
    address_7: string,
    address_8: string,
    address_9: string,
    post_code: string,
    effective_from: string,
    effective_to: string,

}

export interface IRelatedMeasurementClass {
    measurement_class_fk: string,
    effective_from: string,
    effective_to: string,
}

export interface IRelatedEnergisation {
    state_fk: string,
    effective_from: string,
    effective_to: string,
}

export interface IRelatedMeter {
    meter_fk: string,
    installation_date: string,
    removal_date: string,
}

export interface IRelatedMeterClass {
    measurement_class_fk: string,
    effective_from: string,
    effective_to: string,
}

export interface IRelatedAsc {
    value: string,
    effective_from: string,
    effective_to: string,
}

export interface IRelatedSsc {
    ssc_fk: string,
    effective_from: string,
    effective_to: string
}

export interface IRelatesMpan2Mpid2Role {
    market_participant_fk: string,
    role_fk: string,
    effective_from: string,
    effective_to: string,
}

export interface IShortMpan {
    id: string,
    mpan_address: string,
    meter: string,
}

export interface IMpanLists {
    result: IShortMpan[],
}


export interface IMpanDetailsResponse {
    id: string,
    unmetered: boolean,
    umso_reference: string,
    //
    ct_ratio: string,
    ct_class: string,
    ct_rating: number,
    vt_ratio: string,
    vt_class: string,
    vt_rating: string,
    export: boolean,
    unique_property_reference_number: string,
    plot_number: string,
    property_type: string,
    supply_voltage: string,
    supply_capacity: string,
    //
    mpan_address: IRelatedAddress,
    mailing_address: IRelatedAddress,
    asc: string,
    energisation: IRelatedEnergisation,
    llfc: IRelatedLLFC,
    mc: IRelatedMeasurementClass,
    meter: IRelatedMeter,
    //
    da_mpid: IRelatesMpan2Mpid2Role,
    dc_mpid: IRelatesMpan2Mpid2Role,
    mop_mpid: IRelatesMpan2Mpid2Role,
    supplier_mpid: IRelatesMpan2Mpid2Role,
    //
    ssc: IRelatedSsc,
}


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
        line_1: string,
        line_2: string,
        line_3: string,
        line_4: string,
        line_5: string,
        line_6: string,
        line_7: string,
    },
    mailing_address: {
        line_1: string,
        line_2: string,
        line_3: string,
        line_4: string,
        line_5: string,
        line_6: string,
        line_7: string,
    },
}

export abstract class IMPANDetailsAPIService {
    abstract getMpanDetails(): Observable<IMPANDetailsData>;
    abstract getMPANDetailsByAPI(id: string): Observable<IMpanDetailsResponse>;
}