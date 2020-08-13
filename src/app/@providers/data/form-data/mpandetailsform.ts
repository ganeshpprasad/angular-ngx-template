import {FormGroup} from "@angular/forms";
import {IMpanDetailsResponse} from "../mpandetails";


export interface IFieldAttributes {
    label: string,
    placeholder: string,
    tooltip: string,
    isReadOnly: boolean,
    formControlName: string,
}

export abstract class IMPANDetailsFormService {
    abstract mpan_form: FormGroup;

    abstract loadMPANDetails(mpanDetailsResponse: IMpanDetailsResponse);
    abstract getFieldAttributes() : {[key:string]: IFieldAttributes};
}