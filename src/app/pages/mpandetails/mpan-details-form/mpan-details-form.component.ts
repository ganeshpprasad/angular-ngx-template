import {Component, Input, OnInit} from '@angular/core';
import {IMPANDetailsAPIService, IMPANDetailsData} from "../../../@providers/data/mpandetails";
import {FormGroup} from "@angular/forms";
import {IMPANDetailsFormService} from "../../../@providers/data/form-data/mpandetailsform";
import {MpanDetailsFormService} from "../../../@providers/services/form-data/mpandetailsform.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
    selector: 'ngx-mpan-details-form',
    templateUrl: './mpan-details-form.component.html',
    styleUrls: ['./mpan-details-form.component.scss'],
    providers: [
        {provide: IMPANDetailsFormService, useClass: MpanDetailsFormService},
    ]
})
export class MpanDetailsFormComponent implements OnInit {

    @Input() mpan_id: string;

    private routed_id$: Observable<string>;
    private mpandetails: IMPANDetailsData;

    get form(): FormGroup {
        return this.mpanDetailsFormService.form;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mpanDetailsAPIService: IMPANDetailsAPIService,
        private mpanDetailsFormService: IMPANDetailsFormService) {

        this.mpanDetailsAPIService.getMpanDetails()
            .subscribe((mpan: IMPANDetailsData) => {
                console.log(mpan);
                this.mpandetails = mpan;
            });
    }

    ngOnInit() {
        console.log(this.route);
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
                params.get('id')
            )
        );
        this.mpanDetailsFormService.loadMPANDetails(this.mpandetails);
    }

    onClickBack(){
        this.router.navigate(['../', {}], { relativeTo: this.route });
    }

}
