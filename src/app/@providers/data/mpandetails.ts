import {Observable} from 'rxjs';

export interface MPANDetailsData {
    mpan_id: string;
    customer_name: string;
}

export abstract class MPANDetails {
    abstract getMpanDetails(): Observable<MPANDetailsData>;
}