import {Injectable} from '@angular/core';
import {IAssetDetailsFormService} from '../../data/form-data/assetdetailsform';
import {IFieldAttributes} from '../../data/form-data/mpandetailsform';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IRelatedAsset} from '../../data/mpandetails';


@Injectable()
export class AssetDetailsFormService implements IAssetDetailsFormService {
    asset_details_form: FormGroup;


    constructor(private fb: FormBuilder) {
        this.asset_details_form = this.fb.group({
            id: null,
            business_reference: [null, Validators.minLength(3)],
            description: [null, Validators.minLength(5)],
            plot_number: [null, Validators.minLength(1)],
            reference_to_plan: null,
            property_type: null,
            supply_capacity: [null, Validators.pattern('[0-9]*')],
            supply_voltage: [null, Validators.pattern('[0-9]*')],
            address: this.fb.group({
                address_type: null,
                address_1: null,
                address_2: null,
                address_3: null,
                address_4: null,
                address_5: null,
                address_6: null,
                address_7: null,
                address_8: null,
                address_9: null,
                post_code: null,
                effective_from: null,
                effective_to: null,
                id: null,
            }),
        });
        this.setFieldAttributes();
    }

    private setFieldAttributes() {
    }

    getFieldAttributes(): { [p: string]: IFieldAttributes } {
        return {};
    }

    loadAssetDetails(assetDetailsResponse: IRelatedAsset) {
        this.asset_details_form.patchValue({...assetDetailsResponse});
    }


}
