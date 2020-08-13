import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {TimeProfile, TimeProfileData, TimeStartEnd} from "../data/timeprofile";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class TimeProfileService extends TimeProfile {

    private time_profile_url = environment.baseUrl + '/timeprofile';

    profileList: string[] = [
        'Time-Profile-1'
    ];

    constructor(private http: HttpClient) {
        super();
    }

    getTimeProfileList(): Observable<string[]> {
        return this.http.get<string[]>(this.time_profile_url);
    }

    getTimeProfile(profileName: string): Observable<TimeProfileData> {

        let url = `${this.time_profile_url}/${profileName}`;
        return this.http.get<TimeProfileData>(url);
    }

    getNewTimeProfile(): TimeProfileData {
        return {
            _id: '',
            name: 'New Profile',
            priority: 5,
            months_in_yr: [
                ['jan', true],
                ['feb', true],
                ['mar', true],
                ['apr', true],
                ['may', true],
                ['jun', true],
                ['jul', true],
                ['aug', true],
                ['sep', true],
                ['oct', true],
                ['nov', true],
                ['dec', true],
            ],
            days_in_wk: [
                ['sun', true],
                ['mon', true],
                ['tue', false],
                ['wed', false],
                ['thu', false],
                ['fri', false],
                ['sat', false],
            ],
            hours_in_day: [
                {
                    'start_hr': '2330',
                    'end_hr': '0730',
                }
            ],
        }
    }

}