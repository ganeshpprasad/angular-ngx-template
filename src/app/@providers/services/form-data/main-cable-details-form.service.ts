import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from '@angular/forms';
import {IMainCableDetailsFormService} from "../../data/form-data/main-cable-details-form";
import {IMainCableDetailsData} from "../../data/main-cable-details";


@Injectable()
export class MainCableDetailsFormService implements IMainCableDetailsFormService {
    public form: FormGroup;

    constructor(private fb: FormBuilder) {

        this.form = this.fb.group({
            cable_identity: null,
            upstream_asset_identity: null,
            ref_2_plan: null,
            description: null,
            parent_indicator: null,
            parent_mains_cable_identity: null,
        });
    }

    loadMainCableDetails(mainCableDetails: IMainCableDetailsData) {
        this.form.patchValue({
            ...mainCableDetails
        })
    }


}