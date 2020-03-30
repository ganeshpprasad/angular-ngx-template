import {Injectable} from "@angular/core";
import {IAssetDetailsFormService} from "../../data/form-data/assetdetailsform";
import {IFieldAttributes} from "../../data/form-data/mpandetailsform";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IRelatedAsset} from "../../data/mpandetails";


@Injectable()
export class AssetDetailsFormService implements IAssetDetailsFormService {
    asset_details_form: FormGroup;


    constructor(private fb: FormBuilder) {
        this.asset_details_form = this.fb.group({
            id: null,
            business_reference: null,
            description: null,
            plot_number: null,
            reference_to_plan: null,
            property_type: null,
            supply_capacity: null,
            supply_voltage: null,
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
        this.asset_details_form.patchValue({
            ...assetDetailsResponse
        })
    }


}