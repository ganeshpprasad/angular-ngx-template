import {Observable} from 'rxjs';

// Half Hourly profile setup
export interface HHProfileData {
    name: string;
    uuid: string;
}

export interface HHProfileStats {
    min: number;
    max: number;
    mean: number;
}

export abstract class HHProfile {
    abstract getProfileList(): Observable<HHProfileData[]>;
}
