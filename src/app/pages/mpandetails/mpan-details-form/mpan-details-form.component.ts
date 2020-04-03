import {Component, Input, OnInit} from '@angular/core';
import {IMPANDetailsAPIService, IMpanDetailsResponse} from "../../../@providers/data/mpandetails";
import {FormGroup} from "@angular/forms";
import {IFieldAttributes, IMPANDetailsFormService} from "../../../@providers/data/form-data/mpandetailsform";
import {MpanDetailsFormService} from "../../../@providers/services/form-data/mpandetailsform.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from "@nebular/theme";

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
    mpanDetailsResponse: IMpanDetailsResponse;
    formFieldAttributes: { [key: string]: IFieldAttributes };

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
        private mpanDetailsFormService: IMPANDetailsFormService,
        private toastrService: NbToastrService) {

        this.formFieldAttributes = this.mpanDetailsFormService.getFieldAttributes()
    }

    ngOnInit() {
        console.log(this.route);

        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) =>
                params.get('id')
            )
        );
        // Load data from server api
        this.loadServerMpanDetails();
    }

    private loadServerMpanDetails() {
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

    onClickHome() {
        this.router.navigate(['/pages/dashboard', {}], {relativeTo: this.route});
    }

    onClickSave() {
        console.log('MPAN form value -->', this.form.getRawValue());
        console.log('MPAN form status -->', this.form.status);

        // Initialize with original body and only update relevant fields
        // TODO Reset 'Effective From Fields' + Field History
        let post_body = this.mpanDetailsResponse;
        let form_value = this.form.getRawValue();
        post_body['customer_name'] = form_value['customer_name'] ? form_value['customer_name'] : '';
        post_body['connection_date'] = form_value['connection_date'] ? form_value['connection_date'] : '';
        post_body['disconnection_date'] = form_value['disconnection_date'] ? form_value['disconnection_date'] : '';
        // post_body['asset_fk'] = form_value['asset_fk'] ? form_value['asset_fk'] : '';

        console.log('POST BODY -->', post_body);
        this.mpanDetailsAPIService
            .updateMPANDetails(post_body)
            .subscribe((r: string) => {
                console.log('Response from mpan update: ', r);
                this.loadServerMpanDetails();
                this.showToast('INFO: Save MPAN Details', `${r}`, 'info', 'save-outline')
            });
        return;
    }

    onClickReset() {

        console.log('MPAN form value -->', this.form.getRawValue());
        // reset and reload details from server
        this.form.reset();
        this.loadServerMpanDetails();
        console.log('MPAN form value after reset -->', this.form.getRawValue());
        this.showToast('INFO: Reset MPAN Details', ``, 'info', 'refresh-outline');

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
