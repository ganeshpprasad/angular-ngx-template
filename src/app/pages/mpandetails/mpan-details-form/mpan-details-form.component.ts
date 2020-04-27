import {Component, Input, OnInit} from '@angular/core';
import {IMPANDetailsAPIService, IMpanDetailsResponse} from '../../../@providers/data/mpandetails';
import {FormGroup} from '@angular/forms';
import {IFieldAttributes, IMPANDetailsFormService} from '../../../@providers/data/form-data/mpandetailsform';
import {MpanDetailsFormService} from '../../../@providers/services/form-data/mpandetailsform.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';
import {ServerHTTPResponse} from '../../../@core/data/http-response';

@Component({
    selector: 'ngx-mpan-details-form',
    templateUrl: './mpan-details-form.component.html',
    styleUrls: ['./mpan-details-form.component.scss'],
    providers: [
        {provide: IMPANDetailsFormService, useClass: MpanDetailsFormService},
    ],
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

        this.formFieldAttributes = this.mpanDetailsFormService.getFieldAttributes();
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
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
        // TODO combine in an array of observers
        this.llfcObserver = this.form.get('llfc')
            .get('line_loss_factor_class_fk')
            .valueChanges.subscribe(
                () => {
                    this.form.get('llfc').get('effective_from').setValue('x');
                },
            );
        this.ascObserver = this.form.get('asc')
            .get('value')
            .valueChanges.subscribe(
                () => {
                    this.form.get('asc').get('effective_from').setValue('x');
                },
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
        const post_body = this.form.getRawValue();
        console.log('POST BODY -->', post_body);
        this.mpanDetailsAPIService
            .updateMPANDetails(post_body)
            .subscribe((r: ServerHTTPResponse<string>) => {
                console.log('Response from mpan update: ', r.message);
                console.log('Errors from mpan update: ', r.errors);
                if (r.errors.length > 0) {
                    for (const err of r.errors) {
                        console.log('Errors from mpan update: ', err);
                        const err_string = JSON.stringify(err);
                        this.showToast('VALIDATION ERROR(S): On save MPAN Details',
                            `${err_string}`,
                            'danger',
                            'save-outline');
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
        const formCtrlName = this.formFieldAttributes[fieldName].formControlName;
        const formGroup = groupName ? this.form.get(groupName) : this.form;

        let fieldStatus = this.isFormEditable ? 'info' : '';
        fieldStatus = this.formFieldAttributes[fieldName].isReadOnly ? '' : fieldStatus;
        fieldStatus = formGroup.get(formCtrlName).dirty ? 'success' : fieldStatus;
        fieldStatus = formGroup.get(formCtrlName).invalid ? 'danger' : fieldStatus;
        return fieldStatus;
    }

}
