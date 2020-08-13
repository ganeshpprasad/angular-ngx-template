import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {IServiceAccountDetails, IServiceAccountDetailsAPIService} from '../../../@providers/data/service-account';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
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
