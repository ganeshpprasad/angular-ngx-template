import {SrvAccountTableRouteComponent} from './../../srv-account/srv-account-table-route/srv-account-table-route.component';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import {Observable, of} from 'rxjs';
import {
    ICustomerDetails,
    ICustomerDetailsAPIService,
} from '../../../@providers/data/customer-details';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {catchError, flatMap, map} from 'rxjs/operators';
import {
    IServiceAccountDetails,
    IServiceAccountDetailsAPIService,
} from '../../../@providers/data/service-account';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
    selector: 'ngx-customer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
    @Input() customer_id: string;

    routed_id$: Observable<string>;
    customerDetails$: Observable<ICustomerDetails>;
    serviceAccounts$: Observable<IServiceAccountDetails[]>;
    localDataSource: LocalDataSource = new LocalDataSource();

    tableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            service_id: {
                title: 'Service ID',
                type: 'custom',
                editable: false,
                renderComponent: SrvAccountTableRouteComponent,
                width: '50px',
            },
            service_type: {
                title: 'Service Type',
                type: 'string',
                editable: false,
                width: '50px',
            },
            asset_id: {
                title: 'Asset ID',
                type: 'string',
                editable: false,
                width: '50px',
            },
            service_status: {
                title: 'Service Status',
                type: 'string',
                editable: false,
                width: '50px',
            },
        },
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerDetailsAPIService: ICustomerDetailsAPIService,
        private serviceDetailsAPIService: IServiceAccountDetailsAPIService,
    ) {
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        this.customerDetails$ = this.routed_id$.pipe(
            flatMap(id =>
                this.customerDetailsAPIService.getCustomerDetailsByID(id),
            ),
            catchError(_ => of(null)),
        );
        this.serviceAccounts$ = this.routed_id$.pipe(
            flatMap(id =>
                this.serviceDetailsAPIService.getServiceAccountForCustomer(id),
            ),
            catchError(_ => of(null)),
        );
        this.serviceAccounts$.subscribe((results: IServiceAccountDetails[]) =>
            this.loadResults(results),
        );
    }

    loadResults(results: IServiceAccountDetails[]) {
        const table_results = results.map(service => {
            return {
                service_id: service.service_id,
                service_type: service.service_type,
                asset_id: service.asset_id,
                service_status: service.service_status,
            };
        });
        this.localDataSource.load(table_results);
    }

    onEventClick() {
        return;
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/landing', {}], {
            relativeTo: this.route,
        });
    }
}
