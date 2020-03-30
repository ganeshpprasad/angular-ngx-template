import {Observable} from "rxjs";
import {IRelatedAsset} from "./mpandetails";

export interface IAssetDetailsList{
    result: IRelatedAsset[],
}

export abstract class IAssetDetailsAPIService {

    abstract getAssetDetailsByID(id: string): Observable<IRelatedAsset>;

    abstract searchAssetDetails(query: string): Observable<IAssetDetailsList>;
}