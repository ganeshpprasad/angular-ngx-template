import {Observable} from 'rxjs';

export interface TimeStartEnd {
    start_hr: string,
    end_hr: string,
}

export interface TimeProfileMonthData {

}
export interface TimeProfileData {
    _id: string;
    name: string;
    priority: number;
    months_in_yr: Array<[string, boolean]>;
    days_in_wk:  Array<[string, boolean]>;
    hours_in_day: TimeStartEnd[];
}


export abstract class TimeProfile {
    abstract getTimeProfileList(): Observable<string[]>;
    abstract getTimeProfile(profileName: string): Observable<TimeProfileData>;
    abstract getNewTimeProfile(): TimeProfileData;
}
