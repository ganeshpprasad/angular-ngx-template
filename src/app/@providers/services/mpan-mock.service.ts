import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {IMPANDetailsAPIService, IMPANDetailsData} from "../data/mpandetails";

@Injectable()
export class MPANDetailsMockService extends IMPANDetailsAPIService {

    mpandetails: IMPANDetailsData = {
        mpan_id: 'AZERTY',
        customer_name: 'AZERTY',
        site_cable_id: 'AZERTY',
        energisation_status: 'AZERTY',
        measurement_class: 'AZERTY',
    };

    getMpanDetails(): Observable<IMPANDetailsData> {
        return observableOf(this.mpandetails);
    }

}