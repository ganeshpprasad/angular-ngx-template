import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ICustomerDetails, ICustomerDetailsAPIService} from '../../../@providers/data/customer-details';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {IServiceAccountDetails, IServiceAccountDetailsAPIService} from '../../../@providers/data/service-account';

@Component({
    selector: 'ngx-customer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
    @Input() customer_id: string;

    routed_id$: Observable<string>;
    customerDetails: Observable<ICustomerDetails>;
    serviceAccounts: Observable<IServiceAccountDetails[]>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerDetailsAPIService: ICustomerDetailsAPIService,
        private serviceDetailsAPIService: IServiceAccountDetailsAPIService) {
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        this.customerDetails = this.routed_id$
            .pipe(
                flatMap(id => this.customerDetailsAPIService.getCustomerDetailsByID(id)),
            );
        this.serviceAccounts = this.customerDetails
            .pipe(
                flatMap(customer => this.serviceDetailsAPIService.getServiceAccountForCustomer(customer.customer_id)),
            );
        // Load data from server api
        // this.loadCustomerDetails();
    }

    // private loadCustomerDetails() {
    //     this.routed_id$
    //         .pipe(
    //             map(id => this.customerDetailsAPIService.getCustomerDetailsByID(id)),
    //         )
    //     this.routed_id$.subscribe((cusid: string) => {
    //         this.customerDetailsAPIService.getCustomerDetailsByID(cusid)
    //             .subscribe((m: ICustomerDetails) => {
    //                 console.log(m);
    //                 this.customerDetails = m;
    //                 this.loadServiceDetails(this.customerDetails.customer_id);
    //             });
    //     });
    // }
    //
    // private loadServiceDetails(cusid) {
    //     this.serviceDetailsAPIService
    //         .getServiceAccountForCustomer(cusid)
    //         .subscribe((m: IServiceAccountDetails[]) => {
    //             console.log(m);
    //             this.serviceAccounts = m;
    //         });
    // }


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
