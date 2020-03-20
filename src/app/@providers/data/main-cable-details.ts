import {Observable} from 'rxjs';

export interface IMainCableDetailsData {
    cable_identity: string,
    upstream_asset_identity: string,
    ref_2_plan: string,
    description: string,
    parent_indicator: string,
    parent_mains_cable_identity: string,
}

export abstract class IMainCableDetailsAPIService {
    abstract getMainCableDetails(): Observable<IMainCableDetailsData>;
}