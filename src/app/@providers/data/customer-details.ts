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

export interface ICustomerDetails {
    contact_info: IContactInfo;
    billing_address: IBillingAddress;
    customer_id: string;
    title: string;
    first_name: string;
    last_name: string;
    full_name: string;
    company_name: string;
    id: number;
    tags: string[];
    updated_at: string;
}

export interface ICustomerDetailsResponse {
   customer: ICustomerDetails;
}
export interface ICustomerDetailsListResponse {
   customers: ICustomerDetails[];
}

export abstract class ICustomerDetailsAPIService {

    abstract getCustomerDetailsByID(id: string): Observable<ICustomerDetails>;

    abstract searchCustomer(query: string): Observable<ICustomerDetails[]>;

}
