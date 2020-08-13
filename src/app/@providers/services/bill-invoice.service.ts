import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerHTTPResponse} from '../../@core/data/http-response';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {
    IBillInvoiceDetails,
    IBillInvoiceDetailsAPIService,
    IBillInvoiceDetailsListResponse,
    IBillInvoiceDetailsResponse,
} from '../data/bill-invoice';

@Injectable()
export class BillInvoiceService extends IBillInvoiceDetailsAPIService {
    private _url = environment.baseUrl + '/api/v1/bill_invoice';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {
        super();
    }


    getBillInvoiceDetailsByID(id: string): Observable<IBillInvoiceDetails> {
        const details_url: string = this._url + '/' + id;
        return this.http
            .get<ServerHTTPResponse<IBillInvoiceDetailsResponse>>(details_url)
            .pipe(
                map(r => r.result.bill_invoice),
            );
    }

    getBillInvoiceDetailsByServiceID(service_id: string): Observable<IBillInvoiceDetails[]> {
        const details_url: string = this._url + '?service_id=' + service_id;
        return this.http
            .get<ServerHTTPResponse<IBillInvoiceDetailsListResponse>>(details_url)
            .pipe(
                map(r => r.result.bill_invoice),
            );
    }
}
