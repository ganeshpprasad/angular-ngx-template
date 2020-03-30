import {Component, OnInit} from '@angular/core';
import {IAssetDetailsFormService} from "../../../@providers/data/form-data/assetdetailsform";
import {AssetDetailsFormService} from "../../../@providers/services/form-data/assetdetailsform.service";
import {Observable} from "rxjs";
import {IRelatedAsset} from "../../../@providers/data/mpandetails";
import {IFieldAttributes} from "../../../@providers/data/form-data/mpandetailsform";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {IAssetDetailsAPIService} from "../../../@providers/data/assetdetails";

@Component({
    selector: 'ngx-asset-details-view',
    templateUrl: './asset-details-view.component.html',
    styleUrls: ['./asset-details-view.component.scss'],
    providers: [
        {provide: IAssetDetailsFormService, useClass: AssetDetailsFormService},
    ]
})
export class AssetDetailsViewComponent implements OnInit {

    routed_id$: Observable<string>;
    private assetDetailsResponse: IRelatedAsset;
    private formFieldAttributes: { [key: string]: IFieldAttributes };

    get form(): FormGroup {
        return this.assetDetailsFormService.asset_details_form;
    }

    get rawFormValue(): any {
        return this.form.getRawValue();
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private assetDetailsAPIService: IAssetDetailsAPIService,
        private assetDetailsFormService: IAssetDetailsFormService) {

        this.formFieldAttributes = this.assetDetailsFormService.getFieldAttributes()
    }

    ngOnInit() {
        console.log(this.route);

        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
                params.get('id')
            )
        );

        this.routed_id$.subscribe((id: string) => {
            this.assetDetailsAPIService.getAssetDetailsByID(id)
                .subscribe((m: IRelatedAsset) => {
                    console.log(m);
                    this.assetDetailsResponse = m;
                    this.assetDetailsFormService.loadAssetDetails(this.assetDetailsResponse);
                    console.log(this.form.getRawValue());
                });
        });
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }
}
