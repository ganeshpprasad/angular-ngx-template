import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ICustomerDetails, ICustomerDetailsAPIService} from '../../../@providers/data/customer-details';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'ngx-customer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
    @Input() customer_id: string;

    routed_id$: Observable<string>;
    customerDetails: ICustomerDetails;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerDetailsAPIService: ICustomerDetailsAPIService) {
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        // Load data from server api
        this.loadCustomerDetails();
    }

    private loadCustomerDetails() {
        this.routed_id$.subscribe((cusid: string) => {

            this.customerDetailsAPIService.getCustomerDetailsByID(cusid)
                .subscribe((m: ICustomerDetails) => {
                    console.log(m);
                    this.customerDetails = m;
                });
        });
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
