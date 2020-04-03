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
    id: string,
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

export interface IRelatedAsset {
    business_reference: string,
    description: string,
    mpans: IShortMpan[],
    plot_number: string,
    property_type: string,
    reference_to_plan: string,
    supply_capacity: number,
    supply_voltage: number
    address: IRelatedAddress,
}

export interface IShortMpan {
    id: string,
    meter: IRelatedMeter,
    mpan_address: IRelatedAddress,
}

export interface IMpanLists {
    mpans: IShortMpan[],
}


export interface IMpanDetailsResponse {
    id: string,
    customer_name: string,
    unmetered: boolean,
    //
    ct_ratio: string,
    ct_class: string,
    ct_rating: number,
    vt_ratio: string,
    vt_class: string,
    vt_rating: string,
    export: boolean,
    umso_reference: string,
    unique_property_reference_number: string,
    connection_date: string,
    disconnection_date: string,
    asset: IRelatedAsset,
    //
    mpan_address: IRelatedAddress,
    mailing_address: IRelatedAddress,
    asc: IRelatedAsc,
    energisation: IRelatedEnergisation,
    llfc: IRelatedLLFC,
    mc: IRelatedMeasurementClass,
    meter: IRelatedMeter,
    //
    da_mpid: IRelatesMpan2Mpid2Role,
    dc_mpid: IRelatesMpan2Mpid2Role,
    mop_mpid: IRelatesMpan2Mpid2Role,
    supplier_mpid: IRelatesMpan2Mpid2Role,
    ssc: IRelatedSsc,
}


export abstract class IMPANDetailsAPIService {

    abstract getMPANDetailsByID(id: string): Observable<IMpanDetailsResponse>;

    abstract searchMPAN(query: string): Observable<IMpanLists>;

    abstract updateMPANDetails(updateBody: IMpanDetailsResponse): Observable<string>;
}