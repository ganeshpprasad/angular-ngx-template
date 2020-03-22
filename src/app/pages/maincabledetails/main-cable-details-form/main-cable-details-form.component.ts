import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {IMainCableDetailsFormService} from "../../../@providers/data/form-data/main-cable-details-form";
import {MainCableDetailsFormService} from "../../../@providers/services/form-data/main-cable-details-form.service";
import {IMainCableDetailsAPIService, IMainCableDetailsData} from "../../../@providers/data/main-cable-details";

@Component({
    selector: 'ngx-main-cable-details-form',
    templateUrl: './main-cable-details-form.component.html',
    styleUrls: ['./main-cable-details-form.component.scss'],
    providers: [
        {provide: IMainCableDetailsFormService, useClass: MainCableDetailsFormService},
    ]
})
export class MainCableDetailsFormComponent implements OnInit {
    routed_id$: Observable<string>;
    private mainCableDetails: IMainCableDetailsData;

    get form(): FormGroup {
        return this.mainCableDetailsFormService.form;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mainCableDetailsAPIService: IMainCableDetailsAPIService,
        private mainCableDetailsFormService: IMainCableDetailsFormService) {

        this.mainCableDetailsAPIService.getMainCableDetails()
            .subscribe((cable_details: IMainCableDetailsData) => {
                console.log(cable_details);
                this.mainCableDetails = cable_details;
            });
    }

    ngOnInit() {
        console.log(this.route);
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
                params.get('id')
            )
        );
        this.mainCableDetailsFormService.loadMainCableDetails(this.mainCableDetails);
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

}
