import {Observable} from 'rxjs';

export interface IBillingAddress {
    city: string;
    country: string;
    state: string;
    street: string;
    postcode: string;
}

export interface IContactInfo {
    email: string;
    contact_info: string;
}

export interface IServiceAccountDetails {
    contact_info: IContactInfo;
    billing_address: IBillingAddress;
    asset_id: string;
    customer_id: string;
    service_id: string;
    id: string;
    service_type: string;
    service_desc: string;
    service_status: string;
    service_start: string;
    tags: string[];
    updated_at: string;
}


export interface IServiceAccountDetailsResponse {
    service_account: IServiceAccountDetails;
}

export interface IServiceAccountDetailsListResponse {
    service_accounts: IServiceAccountDetails[];
}

export abstract class IServiceAccountDetailsAPIService {

    abstract getServiceAccountDetailsByID(id: string): Observable<IServiceAccountDetails>;

    abstract searchServiceAccount(query: string): Observable<IServiceAccountDetails[]>;

    abstract getServiceAccountForCustomer(customer_id: string): Observable<IServiceAccountDetails[]>;
}
