import {Component, OnInit} from '@angular/core';
import {ISiteDetailsFormService} from "../../../@providers/data/form-data/sitedetailsform";
import {SiteDetailsFormService} from "../../../@providers/services/form-data/sitedetailsform.service";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ISiteDetailsAPIService, ISiteDetailsData} from "../../../@providers/data/sitedetails";
import {map} from "rxjs/operators";

@Component({
    selector: 'ngx-site-details-form',
    templateUrl: './site-details-form.component.html',
    styleUrls: ['./site-details-form.component.scss'],
    providers: [
        {provide: ISiteDetailsFormService, useClass: SiteDetailsFormService},
    ]
})
export class SiteDetailsFormComponent implements OnInit {

    routed_id$: Observable<string>;
    private siteDetails: ISiteDetailsData;

    get form(): FormGroup {
        return this.siteDetailsFormService.form;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private siteDetailsAPIService: ISiteDetailsAPIService,
        private siteDetailsFormService: ISiteDetailsFormService) {

        this.siteDetailsAPIService.getSiteDetails()
            .subscribe((site_details: ISiteDetailsData) => {
                console.log(site_details);
                this.siteDetails = site_details;
            });
    }

    ngOnInit() {
        console.log(this.route);
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
                params.get('id')
            )
        );
        this.siteDetailsFormService.loadSiteDetails(this.siteDetails);
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

}
