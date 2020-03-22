import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {IMainCableDetailsAPIService, IMainCableDetailsData} from "../data/main-cable-details";

@Injectable()
export class MainCableDetailsService extends IMainCableDetailsAPIService {

    cable_details: IMainCableDetailsData = {
        cable_identity: '10EAST01-M01',
        upstream_asset_identity: '10EAST01',
        ref_2_plan: '',
        description: 'This is the description of the asset',
        parent_indicator: true,
        parent_mains_cable_identity: 'CABLE-0111',
    };

    getMainCableDetails(): Observable<IMainCableDetailsData> {
        return observableOf(this.cable_details);
    }


}