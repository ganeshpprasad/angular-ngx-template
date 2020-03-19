import {FormGroup} from "@angular/forms";
import {IMPANDetailsData} from "../mpandetails";

export abstract class IMPANDetailsFormService {
    abstract form: FormGroup;

    abstract loadMPANDetails(mpanDetails: IMPANDetailsData);
}