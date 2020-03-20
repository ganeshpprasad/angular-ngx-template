import {FormGroup} from "@angular/forms";
import {IMainCableDetailsData} from "../main-cable-details";

export abstract class IMainCableDetailsFormService {
    abstract form: FormGroup;

    abstract loadMainCableDetails(mpanDetails: IMainCableDetailsData);
}