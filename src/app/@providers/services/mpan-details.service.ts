import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMPANDetailsAPIService, IMpanDetailsResponse, IMpanLists} from "../data/mpandetails";
import {HttpClient} from "@angular/common/http";
import {ServerHTTPResponse} from "../../@core/data/http-response";
import {map} from "rxjs/operators";

@Injectable()
export class MpanDetailsService extends IMPANDetailsAPIService {

    configUrl = 'assets/mock/data/';

    constructor(private http: HttpClient) {
        super();
    }

    getMPANDetailsByID(mpanid: string): Observable<IMpanDetailsResponse> {
        let mpanURL: string = this.configUrl + mpanid + '.json';
        return this.http
            .get<ServerHTTPResponse<IMpanDetailsResponse>>(mpanURL)
            .pipe(
                map(r => r.result)
            );
    }

    searchMPAN(query: string): Observable<IMpanLists> {
        let mpanURL: string = this.configUrl + 'mpan-search.json';
        return this.http
            .get<ServerHTTPResponse<IMpanLists>>(mpanURL)
            .pipe(
                map(r => r.result)
            );
    }

}