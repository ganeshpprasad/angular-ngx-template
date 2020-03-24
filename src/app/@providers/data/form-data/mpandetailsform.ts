import {FormGroup} from "@angular/forms";
import {IMpanDetailsResponse} from "../mpandetails";

export abstract class IMPANDetailsFormService {
    abstract mpan_form: FormGroup;

    abstract loadMPANDetails(mpanDetailsResponse: IMpanDetailsResponse);
}