import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {IMPANDetailsAPIService, IMPANDetailsData, IMpanDetailsResponse} from "../data/mpandetails";
import {HttpClient} from "@angular/common/http";
import {ServerHTTPResponse} from "../../@core/data/http-response";
import {map} from "rxjs/operators";

@Injectable()
export class MPANDetailsMockService extends IMPANDetailsAPIService {

    mpandetails: IMPANDetailsData = {
        mpan_id: 'MPANID-12345',
        customer_name: 'Admin Will',
        site_cable_id: 'CABLEID-Q09876',
        energisation_status: 'U',
        efd_energisation: '12/07/2011',
        measurement_class: 'A',
        line_loss_factor_class_id: '861',
        llfc_effective_settlement_date: '12/08/2012',
        export_mpan: false,
        unmetered: true,
        std_settlement_id: '',
        effective_from_scon: '11/11/2011',
        customer_pwd: '',
        customer_pwd_efd: '',
        special_needs_code: '',
        efd_special_needs: '',
        special_needs_disc: '',
        umso_ref: 'Description of UMSO Ref, for mpan.',
        conn_date: '',
        disconn_date: '',
        cont_supply_indicator: true,
        meter_point_address: {
            line_1: '',
            line_2: '',
            line_3: '',
            line_4: '',
            line_5: '',
            line_6: '',
            line_7: '',
        },
        mailing_address: {
            line_1: '',
            line_2: '',
            line_3: '',
            line_4: '',
            line_5: '',
            line_6: '',
            line_7: '',
        },
    };

    configUrl = 'assets/mock/data/mpan-details.json';

    constructor(private http: HttpClient) {
        super();
    }

    getMpanDetails(): Observable<IMPANDetailsData> {
        return observableOf(this.mpandetails);
    }

    getMPANDetailsByAPI(id: string): Observable<IMpanDetailsResponse> {
        return this.http
            .get<ServerHTTPResponse<IMpanDetailsResponse>>(this.configUrl)
            .pipe(
                map(r => r.result)
            );
    }

}