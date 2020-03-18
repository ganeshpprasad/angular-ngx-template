import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {MPANDetails, MPANDetailsData} from "../data/mpandetails";

@Injectable()
export class MPANDetailsMockService extends MPANDetails {

    mpandetails: MPANDetailsData = {
        mpan_id: 'MPAN1234567',
        customer_name: 'Will.I.AM'
    };

    getMpanDetails(): Observable<MPANDetailsData> {
        return observableOf(this.mpandetails);
    }

}