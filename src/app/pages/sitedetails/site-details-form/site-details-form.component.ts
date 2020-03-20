import {Component, OnInit} from '@angular/core';
import {ISiteDetailsFormService} from "../../../@providers/data/form-data/sitedetailsform";
import {SiteDetailsFormService} from "../../../@providers/services/form-data/sitedetailsform.service";

@Component({
    selector: 'ngx-site-details-form',
    templateUrl: './site-details-form.component.html',
    styleUrls: ['./site-details-form.component.scss'],
    providers: [
        {provide: ISiteDetailsFormService, useClass: SiteDetailsFormService},
    ]
})
export class SiteDetailsFormComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
