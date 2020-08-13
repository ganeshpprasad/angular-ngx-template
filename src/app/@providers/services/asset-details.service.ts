import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerHTTPResponse} from '../../@core/data/http-response';
import {map} from 'rxjs/operators';
import {IAssetDetailsAPIService, IAssetDetailsList} from '../data/assetdetails';
import {IRelatedAsset} from '../data/mpandetails';
import {environment} from '../../../environments/environment';

@Injectable()
export class AssetDetailsService extends IAssetDetailsAPIService {

    private asset_url = environment.baseUrl + '/api/v1/asset';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };


    constructor(private http: HttpClient) {
        super();
    }

    getAssetDetailsByID(id: string): Observable<IRelatedAsset> {
        const details_url: string = this.asset_url + '/detail';
        const post_body = {
            'asset_id': Number(id),
        };
        return this.http
            .post<ServerHTTPResponse<IRelatedAsset>>(details_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.result),
            );
    }

    searchAssetDetails(query: string): Observable<IAssetDetailsList> {
        const search_url: string = this.asset_url + '/search';
        const post_body = {
            'free_text': query,
        };
        return this.http
            .post<ServerHTTPResponse<IAssetDetailsList>>(search_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.result),
            );
    }

    updateAssetDetails(updateBody: IRelatedAsset): Observable<ServerHTTPResponse<string>> {
        const update_url: string = this.asset_url + '/update';
        const post_body = {
            'result': updateBody,
        };
        return this.http
            .put<ServerHTTPResponse<string>>(update_url, post_body, this.httpOptions)
            .pipe(
            );
    }

}
