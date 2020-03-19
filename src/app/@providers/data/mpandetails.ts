import {Observable} from 'rxjs';

export interface IMPANDetailsData {
    mpan_id: string,
    customer_name: string,
    site_cable_id: string,
    energisation_status: string,
    measurement_class: string,
}

export abstract class IMPANDetailsAPIService {
    abstract getMpanDetails(): Observable<IMPANDetailsData>;
}