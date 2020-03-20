import {Component, Input, OnInit} from '@angular/core';
import {IMPANDetailsAPIService, IMPANDetailsData} from "../../../@providers/data/mpandetails";
import {FormControl, FormGroup} from "@angular/forms";
import {IMPANDetailsFormService} from "../../../@providers/data/form-data/mpandetailsform";
import {MpanDetailsFormService} from "../../../@providers/services/form-data/mpandetailsform.service";

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

    private mpandetails: IMPANDetailsData;

    get form(): FormGroup {
        return this.mpanDetailsFormService.form;
    }

    constructor(
        private mpanDetailsAPIService: IMPANDetailsAPIService,
        private mpanDetailsFormService: IMPANDetailsFormService) {

        this.mpanDetailsAPIService.getMpanDetails()
            .subscribe((mpan: IMPANDetailsData) => {
                console.log(mpan);
                this.mpandetails = mpan;
            });
    }

    ngOnInit() {
        this.mpanDetailsFormService.loadMPANDetails(this.mpandetails);
    }

}
