import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerHTTPResponse} from '../../@core/data/http-response';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {
    IServiceAccountDetails,
    IServiceAccountDetailsAPIService,
    IServiceAccountDetailsListResponse,
    IServiceAccountDetailsResponse,
} from '../data/service-account';

@Injectable()
export class ServiceAccountService extends IServiceAccountDetailsAPIService {
    private _url = environment.baseUrl + '/api/v1/srv_account';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {
        super();
    }


    getServiceAccountDetailsByID(id: string): Observable<IServiceAccountDetails> {
        const details_url: string = this._url + '/' + id;
        return this.http
            .get<ServerHTTPResponse<IServiceAccountDetailsResponse>>(details_url)
            .pipe(
                map(r => r.result.service_account),
            );
    }

    getServiceAccountForCustomer(customer_id: string): Observable<IServiceAccountDetails[]> {
        const details_url: string = this._url + '?customer_id=' + customer_id;
        return this.http
            .get<ServerHTTPResponse<IServiceAccountDetailsListResponse>>(details_url)
            .pipe(
                map(r => r.result.service_accounts),
            );
    }

    searchServiceAccount(query: string): Observable<IServiceAccountDetails[]> {
        const details_url: string = this._url + '?query=' + query;
        return this.http
            .get<ServerHTTPResponse<IServiceAccountDetailsListResponse>>(details_url)
            .pipe(
                map(r => r.result.service_accounts),
            );
    }

}
