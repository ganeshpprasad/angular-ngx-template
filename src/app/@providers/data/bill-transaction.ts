import {Observable} from 'rxjs';

export interface IBillTransaction {
    invoice_id: string;
    service_id: string;
    quantity: number;
    bill_period_st: string;
    transaction_id: string;
    vat_code: string;
    description: string;
    vat_rate: number;
    gross: number;
    tariff_code: string;
    bill_run_id: string;
    vat: number;
    unit_rate: number;
    net: number;
    bill_period_ed: string;
}


export interface IBillTransactionResponse {
    bill_transaction: IBillTransaction;
}

export interface IBillTransactionListResponse {
    bill_transactions: IBillTransaction[];
}

export abstract class IBillTransactionAPIService {
    abstract getBillTransactionsByServiceID(service_id: string): Observable<IBillTransaction[]>;
}
