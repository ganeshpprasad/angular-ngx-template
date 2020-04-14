import {Component, Input, OnInit} from '@angular/core';
import {IMPANDetailsAPIService, IMpanDetailsResponse} from "../../../@providers/data/mpandetails";
import {FormGroup} from "@angular/forms";
import {IFieldAttributes, IMPANDetailsFormService} from "../../../@providers/data/form-data/mpandetailsform";
import {MpanDetailsFormService} from "../../../@providers/services/form-data/mpandetailsform.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from "@nebular/theme";
import {ServerHTTPResponse} from "../../../@core/data/http-response";

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

    isFormEditable: boolean = false;
    routed_id$: Observable<string>;
    mpanDetailsResponse: IMpanDetailsResponse;
    formFieldAttributes: { [key: string]: IFieldAttributes };
    llfcObserver: Subscription;
    ascObserver: Subscription;


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
                    this.setupObservers();
                });
        });
    }

    private setupObservers() {
        //TODO combine in an array of observers
        this.llfcObserver = this.form.get('llfc')
            .get('line_loss_factor_class_fk')
            .valueChanges.subscribe(
                () => {
                    this.form.get('llfc').get('effective_from').setValue('x');
                }
            );
        this.ascObserver = this.form.get('asc')
            .get('value')
            .valueChanges.subscribe(
                () => {
                    this.form.get('asc').get('effective_from').setValue('x');
                }
            );
    }

    private clearObservers() {
        this.llfcObserver.unsubscribe();
        this.ascObserver.unsubscribe();
    }

    private resetAndReload() {
        this.clearObservers();
        // reset and reload details from server
        this.isFormEditable = false;
        this.form.reset();
        this.loadServerMpanDetails();
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/dashboard', {}], {relativeTo: this.route});
    }

    onClickSave() {
        // console.log('MPAN form status -->', this.form.status);
        console.log('MPAN form value -->', this.form.getRawValue());
        console.log('MPAN form validity -->', this.form.valid);

        if (!this.form.valid) {
            this.showToast('ERR: MPAN edit details not valid!',
                'Please correct edited field values',
                'danger',
                'save-outline');
            return;
        }

        // Initialize with original body and only update relevant fields
        let post_body = this.form.getRawValue();
        console.log('POST BODY -->', post_body);
        this.mpanDetailsAPIService
            .updateMPANDetails(post_body)
            .subscribe((r: ServerHTTPResponse<string>) => {
                console.log('Response from mpan update: ', r.message);
                console.log('Errors from mpan update: ', r.errors);
                if (r.errors.length > 0) {
                    for (let err of r.errors) {
                        console.log('Errors from mpan update: ', err);
                        let err_string = JSON.stringify(err);
                        this.showToast('VALIDATION ERROR(S): On save MPAN Details',
                            `${err_string}`,
                            'danger',
                            'save-outline')
                    }
                } else {
                    this.showToast('SUCCESS: Save MPAN Details',
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

    getFieldStatus(fieldName: string, groupName?: string) {
        let formCtrlName = this.formFieldAttributes[fieldName].formControlName;
        let formGroup = groupName ? this.form.get(groupName) : this.form;

        let fieldStatus = this.isFormEditable ? 'info' : '';
        fieldStatus = this.formFieldAttributes[fieldName].isReadOnly ? '' : fieldStatus;
        fieldStatus = formGroup.get(formCtrlName).dirty ? 'success' : fieldStatus;
        fieldStatus = formGroup.get(formCtrlName).invalid ? 'danger' : fieldStatus;
        return fieldStatus;
    }

    // getSavePostBody() {
    //     // get the original response body..
    //     let post_body = this.mpanDetailsResponse;
    //     // get the form data with edited values..
    //     let form_value = this.form.getRawValue();
    //     // // Only capture the fields that are allowed to be edited
    //     // // We update the original mpan details to override with new field values
    //     // post_body['customer_name'] = form_value['customer_name'] ? form_value['customer_name'] : '';
    //     // post_body['connection_date'] = form_value['connection_date'] ? form_value['connection_date'] : '';
    //     // post_body['disconnection_date'] = form_value['disconnection_date'] ? form_value['disconnection_date'] : '';
    //     // // post_body['asset'] = form_value['asset'] ? form_value['asset'] : {};
    //     //
    //     // // Check if we have LLFC in post body and it has changed
    //     // if ('llfc' in post_body && 'line_loss_factor_class_fk' in post_body['llfc']) {
    //     //     // we have existing LLFC
    //     //     let hasLlfcChanged = form_value['llfc']['line_loss_factor_class_fk'] != post_body['llfc']['line_loss_factor_class_fk'];
    //     //     let hasEffFromDateChanged = form_value['llfc']['effective_from'] != post_body['llfc']['effective_from'];
    //     //
    //     //     if (hasLlfcChanged || hasEffFromDateChanged) {
    //     //         let changed_llfc = form_value['llfc'];
    //     //         post_body['llfc_history'].push(changed_llfc);
    //     //     }
    //     //     // TODO check for case where only one value changes or effective date is brought forward.
    //     // }
    //     // else if (form_value['llfc']['line_loss_factor_class_fk'] != null) {
    //     //     let changed_llfc = form_value['llfc'];
    //     //     post_body['llfc_history'] = [];
    //     //     post_body['llfc_history'].push(changed_llfc);
    //     // }
    //     //
    //     // // Check if we have ASC in post body and it has changed
    //     // if ('asc' in post_body && 'value' in post_body['asc']) {
    //     //     // we have existing ASC
    //     //     let hasAscChanged = form_value['asc']['value'] != post_body['asc']['value'];
    //     //     let hasEffFromDateChanged = form_value['asc']['effective_from'] != post_body['asc']['effective_from'];
    //     //
    //     //     if (hasAscChanged || hasEffFromDateChanged) {
    //     //         let changed_asc = form_value['asc'];
    //     //         post_body['asc_history'].push(changed_asc);
    //     //     }
    //     //     // TODO check for case where only one value changes or effective date is brought forward.
    //     // }
    //     // else if (form_value['asc']['value'] != null) {
    //     //     let changed_asc = form_value['asc'];
    //     //     post_body['asc_history'] = [];
    //     //     post_body['asc_history'].push(changed_asc);
    //     // }
    //     // // TODO Address update
    //     // // we have existing address
    //     // let newAddress = form_value['mpan_address']['address_1'] ? form_value['mpan_address']['address_1'] : '';
    //     // newAddress += form_value['mpan_address']['address_2'] ? form_value['mpan_address']['address_2'] : '';
    //     // newAddress += form_value['mpan_address']['address_3'] ? form_value['mpan_address']['address_3'] : '';
    //     // newAddress += form_value['mpan_address']['address_4'] ? form_value['mpan_address']['address_4'] : '';
    //     // newAddress += form_value['mpan_address']['address_5'] ? form_value['mpan_address']['address_5'] : '';
    //     // newAddress += form_value['mpan_address']['address_6'] ? form_value['mpan_address']['address_6'] : '';
    //     // newAddress += form_value['mpan_address']['address_7'] ? form_value['mpan_address']['address_7'] : '';
    //     // newAddress += form_value['mpan_address']['address_8'] ? form_value['mpan_address']['address_8'] : '';
    //     // newAddress += form_value['mpan_address']['address_9'] ? form_value['mpan_address']['address_9'] : '';
    //     // newAddress += form_value['mpan_address']['post_code'] ? form_value['mpan_address']['post_code'] : '';
    //     // if ('mpan_address' in post_body) {
    //     //     let lastAddress = post_body['mpan_address']['address_1'] ? post_body['mpan_address']['address_1'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_2'] ? post_body['mpan_address']['address_2'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_3'] ? post_body['mpan_address']['address_3'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_4'] ? post_body['mpan_address']['address_4'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_5'] ? post_body['mpan_address']['address_5'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_6'] ? post_body['mpan_address']['address_6'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_7'] ? post_body['mpan_address']['address_7'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_8'] ? post_body['mpan_address']['address_8'] : '';
    //     //     lastAddress += post_body['mpan_address']['address_9'] ? post_body['mpan_address']['address_9'] : '';
    //     //     lastAddress += post_body['mpan_address']['post_code'] ? form_value['mpan_address']['post_code'] : '';
    //     //
    //     //     let hasAddressChanged = lastAddress != newAddress;
    //     //     let hasEffFromDateChanged = form_value['mpan_address']['effective_from'] != post_body['mpan_address']['effective_from'];
    //     //
    //     //     if (hasAddressChanged || hasEffFromDateChanged) {
    //     //         let changed_address = form_value['mpan_address'];
    //     //         post_body.mpan_address_history.push(changed_address);
    //     //     }
    //     //     // TODO check for case where only one value changes or effective date is brought forward.
    //     // }
    //     return form_value;
    // }

}
