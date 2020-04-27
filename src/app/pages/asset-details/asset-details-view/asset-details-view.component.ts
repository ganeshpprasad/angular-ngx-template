import {Component, OnInit} from '@angular/core';
import {IAssetDetailsFormService} from '../../../@providers/data/form-data/assetdetailsform';
import {AssetDetailsFormService} from '../../../@providers/services/form-data/assetdetailsform.service';
import {Observable} from 'rxjs';
import {IRelatedAsset} from '../../../@providers/data/mpandetails';
import {IFieldAttributes} from '../../../@providers/data/form-data/mpandetailsform';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {IAssetDetailsAPIService} from '../../../@providers/data/assetdetails';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';
import {ServerHTTPResponse} from '../../../@core/data/http-response';

@Component({
    selector: 'ngx-asset-details-view',
    templateUrl: './asset-details-view.component.html',
    styleUrls: ['./asset-details-view.component.scss'],
    providers: [
        {provide: IAssetDetailsFormService, useClass: AssetDetailsFormService},
    ],
})
export class AssetDetailsViewComponent implements OnInit {

    routed_id$: Observable<string>;
    assetDetailsResponse: IRelatedAsset;
    formFieldAttributes: { [key: string]: IFieldAttributes };
    isFormEditable: boolean = false;

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
        private assetDetailsFormService: IAssetDetailsFormService,
        private toastrService: NbToastrService) {

        this.formFieldAttributes = this.assetDetailsFormService.getFieldAttributes();
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        // load details from server..
        this.loadServerAssetDetails();
    }

    private loadServerAssetDetails() {
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

    private resetAndReload() {
        // reset and reload details from server
        this.isFormEditable = false;
        this.form.reset();
        this.loadServerAssetDetails();
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/dashboard', {}], {relativeTo: this.route});
    }

    onClickSave() {
        // console.log('MPAN form status -->', this.form.status);
        console.log('Asset form value -->', this.form.getRawValue());
        console.log('Asset form validity -->', this.form.valid);

        if (!this.form.valid) {
            this.showToast('ERR: Asset edited details not valid!',
                'Please correct edited field values',
                'danger',
                'save-outline');
            return;
        }

        // Initialize with original body and only update relevant fields
        const post_body = this.form.getRawValue();
        console.log('POST BODY -->', post_body);
        this.assetDetailsAPIService
            .updateAssetDetails(post_body)
            .subscribe((r: ServerHTTPResponse<string>) => {
                console.log('Response from asset update: ', r.message);
                console.log('Errors from asset update: ', r.errors);
                if (r.errors.length > 0) {
                    for (const err of r.errors) {
                        console.log('Errors from asset update: ', err);
                        const err_string = JSON.stringify(err);
                        this.showToast('VALIDATION ERROR(S): On save Asset Details',
                            `${err_string}`,
                            'danger',
                            'save-outline');
                    }
                } else {
                    this.showToast('SUCCESS: ASSET Details Saved',
                        `${r.message}`,
                        'success',
                        'save-outline');
                    this.resetAndReload();
                }
            });
        return;
    }

    onClickReset() {
        // reset and reload details from server
        this.resetAndReload();
        // show message
        this.showToast('INFO: Reset ASSET Details', ``, 'info', 'refresh-outline');
        return;
    }

    private showToast(title: string, body: string, status: NbComponentStatus, icon: string) {
        const config: Partial<NbToastrConfig> = {
            status: status,
            destroyByClick: true,
            duration: 7500,
            hasIcon: true,
            icon: icon,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
        };
        const titleContent = title ? `${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }

}
