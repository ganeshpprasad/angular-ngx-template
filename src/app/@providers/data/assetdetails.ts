import {Observable} from 'rxjs';
import {IRelatedAsset} from './mpandetails';
import {ServerHTTPResponse} from '../../@core/data/http-response';

export interface IAssetDetailsList {
    result: IRelatedAsset[];
}

export abstract class IAssetDetailsAPIService {

    abstract getAssetDetailsByID(id: string): Observable<IRelatedAsset>;

    abstract searchAssetDetails(query: string): Observable<IAssetDetailsList>;

    abstract updateAssetDetails(updateBody: IRelatedAsset): Observable<ServerHTTPResponse<string>>;
}
