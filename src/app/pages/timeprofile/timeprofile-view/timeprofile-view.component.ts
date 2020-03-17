import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TimeProfile, TimeProfileData} from "../../../@providers/data/timeprofile";
import {createForJitStub} from "@angular/compiler/src/aot/summary_serializer";


@Component({
    selector: 'ngx-time-profile-view',
    styleUrls: ['./timeprofile-view.component.scss'],
    templateUrl: './timeprofile-view.component.html',
})
export class TimeProfileViewComponent implements OnChanges {

    @Input() profile_name: string;
    priorities = [
        {
            priority: 1,
            text: 'priority-1',
        },
        {
            priority: 2,
            text: 'priority-2'
        },
        {
            priority: 3,
            text: 'priority-3'
        },
        {
            priority: 4,
            text: 'priority-4'
        },
        {
            priority: 5,
            text: 'priority-5'
        },
    ];

    model: TimeProfileData;

    constructor(private timeProfileService: TimeProfile) {
        this.model = this.timeProfileService.getNewTimeProfile();
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.profile_name) {
            // When input changes update get the data from server and update the time period model
            console.log(changes.profile_name);
            this.loadTimeProfile();

            if (changes.profile_name.currentValue) {
                console.log(changes.profile_name.currentValue);
                //    get new timeprofile data from timeprofileService
            }
        }
    }

    private loadTimeProfile(): void {
        console.log(this.profile_name);
        if(this.profile_name) {

            this.timeProfileService
                .getTimeProfile(this.profile_name)
                .subscribe((timeProfileData: TimeProfileData) => {
                    console.log(timeProfileData);
                    this.model = timeProfileData
                });
        }
    }


}
