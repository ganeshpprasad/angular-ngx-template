import {FormGroup} from "@angular/forms";
import {ISiteDetailsData} from "../sitedetails";

export abstract class ISiteDetailsFormService {
    abstract form: FormGroup;

    abstract loadSiteDetails(siteDetails: ISiteDetailsData);
}