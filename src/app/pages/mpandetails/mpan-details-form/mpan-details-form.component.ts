import {Component, Input, OnInit} from '@angular/core';
import {IMPANDetailsAPIService, IMPANDetailsData, IMpanDetailsResponse} from "../../../@providers/data/mpandetails";
import {FormGroup} from "@angular/forms";
import {IMPANDetailsFormService, IFieldAttributes} from "../../../@providers/data/form-data/mpandetailsform";
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

    routed_id$: Observable<string>;
    private mpandetails: IMPANDetailsData;
    private mpanDetailsResponse: IMpanDetailsResponse;
    private formFieldAttributes: {[key:string]: IFieldAttributes};

    get form(): FormGroup {
        return this.mpanDetailsFormService.mpan_form;
    }

    get rawFormValue(): any {
        return this.form.getRawValue();
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mpanDetailsAPIService: IMPANDetailsAPIService,
        private mpanDetailsFormService: IMPANDetailsFormService) {

        this.formFieldAttributes = this.mpanDetailsFormService.getFieldAttributes()
    }

    ngOnInit() {
        console.log(this.route);

        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
                params.get('id')
            )
        );

        this.routed_id$.subscribe((mpanid: string) => {
            this.mpanDetailsAPIService.getMPANDetailsByID(mpanid)
                .subscribe((m: IMpanDetailsResponse) => {
                    console.log(m);
                    this.mpanDetailsResponse = m;
                    this.mpanDetailsFormService.loadMPANDetails(this.mpanDetailsResponse);
                    console.log(this.form.getRawValue());
                });
        });
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

}
