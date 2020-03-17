import {Injectable} from '@angular/core';
import {of as observableOf, Observable} from 'rxjs';
import {HHProfile, HHProfileData} from "../data/hhprofile";

@Injectable()
export class HHProfileService extends HHProfile {

    profileList: HHProfileData[] = [
        {name: 'Profile- 1', uuid: '1233'},
        {name: 'Profile- 2', uuid: '1233'},
        {name: 'Profile- 3', uuid: '1233'},
        {name: 'Profile- 4', uuid: '1233'},
        {name: 'Profile- 5', uuid: '1233'},
    ];

    getProfileList(): Observable<HHProfileData[]> {
        return observableOf(this.profileList);
    }

}