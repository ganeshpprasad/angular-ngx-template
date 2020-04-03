import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMPANDetailsAPIService, IMpanDetailsResponse, IMpanLists} from "../data/mpandetails";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServerHTTPResponse} from "../../@core/data/http-response";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable()
export class MpanDetailsService extends IMPANDetailsAPIService {

    private mpan_url = environment.baseUrl + '/api/v1/mpan';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {
        super();
    }

    getMPANDetailsByID(mpanid: string): Observable<IMpanDetailsResponse> {
        let details_url: string = this.mpan_url + '/detail';
        let post_body = {
            'mpan_id': mpanid,
        };
        return this.http
            .post<ServerHTTPResponse<IMpanDetailsResponse>>(details_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.result)
            );
    }

    searchMPAN(query: string): Observable<IMpanLists> {
        let search_url: string = this.mpan_url + '/search';
        let post_body = {
            'free_text': query,
        };
        return this.http
            .post<ServerHTTPResponse<IMpanLists>>(search_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.result)
            );
    }

    updateMPANDetails(updateBody: IMpanDetailsResponse): Observable<string> {
        let update_url: string = this.mpan_url + '/update';
        let post_body = {
            'result': updateBody,
        };
        return this.http
            .put<ServerHTTPResponse<string>>(update_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.message)
            );
    }

}