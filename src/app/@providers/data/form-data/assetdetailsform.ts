import {FormGroup} from '@angular/forms';
import {IRelatedAsset} from '../mpandetails';
import {IFieldAttributes} from './mpandetailsform';


export abstract class IAssetDetailsFormService {
    abstract asset_details_form: FormGroup;

    abstract loadAssetDetails(assetDetailsResponse: IRelatedAsset);

    abstract getFieldAttributes(): { [key: string]: IFieldAttributes };
}
