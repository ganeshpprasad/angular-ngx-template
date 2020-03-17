import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {TimeProfile, TimeProfileData} from "../../../@providers/data/timeprofile";


@Component({
    selector: 'ngx-time-profile-list',
    styleUrls: ['./timeprofile-list.component.scss'],
    templateUrl: './timeprofile-list.component.html',
})
export class TimeProfileListComponent implements AfterViewInit {
    @Output() profile_click: EventEmitter<string> = new EventEmitter<string>();

    profileList: string[] = [];

    constructor(private timeProfileService: TimeProfile) {
        this.timeProfileService.getTimeProfileList()
            .subscribe((profileList: string[]) => {
                this.profileList = profileList;
            });
    }

    onProfileClick(profile: string) {
        this.profile_click.emit(profile);
    }

    ngAfterViewInit(): void {
    }

    // openNewProfileForm() {
    //     this.windowService.open(HHProfileFormComponent,
    //         {title: `New Half-Hourly Profile`});
    // }

}
