import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerHTTPResponse} from '../../@core/data/http-response';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IBillTransaction, IBillTransactionAPIService, IBillTransactionListResponse} from '../data/bill-transaction';

@Injectable()
export class BillTransactionService extends IBillTransactionAPIService {
    private _url = environment.baseUrl + '/api/v1/bill_transaction';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {
        super();
    }

    getBillTransactionsByServiceID(service_id: string): Observable<IBillTransaction[]> {
        const _url: string = this._url + '?service_id=' + service_id;
        return this.http
            .get<ServerHTTPResponse<IBillTransactionListResponse>>(_url)
            .pipe(
                map(r => r.result.bill_transactions),
            );
    }
}
