import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {ServerHTTPResponse} from "../../@core/data/http-response";
import {map} from "rxjs/operators";
import {IAssetDetailsAPIService, IAssetDetailsList} from "../data/assetdetails";
import {IRelatedAsset} from "../data/mpandetails";

@Injectable()
export class AssetDetailsService extends IAssetDetailsAPIService {

    configUrl = 'assets/mock/data/';

    constructor(private http: HttpClient) {
        super();
    }

    getAssetDetailsByID(id: string): Observable<IRelatedAsset> {
        let assetURL: string = this.configUrl + 'asset-by-id' + '.json';
        return this.http
            .get<ServerHTTPResponse<IRelatedAsset>>(assetURL)
            .pipe(
                map(r => r.result)
            );
    }

    searchAssetDetails(query: string): Observable<IAssetDetailsList> {
        let assetURL: string = this.configUrl + 'asset-search.json';
        return this.http
            .get<ServerHTTPResponse<IAssetDetailsList>>(assetURL)
            .pipe(
                map(r => r.result)
            );
    }

}