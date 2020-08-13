import {Observable} from 'rxjs';

export interface IBillInvoiceDetails {
    invoice_id: string;
    service_id: string;
    bill_run_id: string;
    bill_no: Number;
    id: string;
    description: string;
    date_issued: string;
    gross: Number;
    net: Number;
    open_bal: Number;
    total_due: Number;
    vat: Number;
}


export interface IBillInvoiceDetailsResponse {
    bill_invoice: IBillInvoiceDetails;
}

export interface IBillInvoiceDetailsListResponse {
    bill_invoice: IBillInvoiceDetails[];
}

export abstract class IBillInvoiceDetailsAPIService {

    abstract getBillInvoiceDetailsByID(id: string): Observable<IBillInvoiceDetails>;

    abstract getBillInvoiceDetailsByServiceID(service_id: string): Observable<IBillInvoiceDetails[]>;

}
