import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {IServiceAccountDetails, IServiceAccountDetailsAPIService} from '../../../@providers/data/service-account';
import {IBillInvoiceDetails, IBillInvoiceDetailsAPIService} from '../../../@providers/data/bill-invoice';

@Component({
    selector: 'ngx-srv-account',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './srv-account-details.component.html',
    styleUrls: ['./srv-account-details.component.scss'],
})
export class SrvAccountDetailsComponent implements OnInit {
    @Input() service_id: string;

    routed_id$: Observable<string>;
    serviceAccount: Observable<IServiceAccountDetails>;
    billInvoices: Observable<IBillInvoiceDetails[]>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private billInvoiceDetailsAPIService: IBillInvoiceDetailsAPIService,
        private serviceDetailsAPIService: IServiceAccountDetailsAPIService) {
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        this.serviceAccount = this.routed_id$
            .pipe(
                flatMap(id => this.serviceDetailsAPIService.getServiceAccountDetailsByID(id)),
            );
        this.billInvoices = this.serviceAccount
            .pipe(
                flatMap(service_ac =>
                    this.billInvoiceDetailsAPIService.getBillInvoiceDetailsByServiceID(service_ac.service_id)),
            );
    }


    onEventClick() {
        return;
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/landing', {}], {relativeTo: this.route});
    }

}
