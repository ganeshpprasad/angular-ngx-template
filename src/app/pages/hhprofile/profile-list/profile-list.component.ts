import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {HHProfile, HHProfileData} from "../../../@providers/data/hhprofile";
import {NbWindowService} from "@nebular/theme";
import {HHProfileFormComponent} from "../hhprofile-form/hhprofile-form.component";

export interface ProfileHalfHourly {
    name: string,
    uuid: string
}

@Component({
    selector: 'ngx-profile-list',
    styleUrls: ['./profile-list.component.scss'],
    templateUrl: './profile-list.component.html',
})
export class ProfileListComponent implements AfterViewInit {
    @Output() profile_click: EventEmitter<string> = new EventEmitter<string>();

    profileList: ProfileHalfHourly[] = [];

    constructor(private hhProfileService: HHProfile,
                private windowService: NbWindowService) {
        this.hhProfileService.getProfileList()
            .subscribe((profileList: HHProfileData[]) => {
                let profile_names = profileList.map((p) => p.name);
                console.log(profile_names);
                this.profileList = profileList;
            });
    }

    onProfileClick(profile: ProfileHalfHourly) {
        console.log(profile);
        this.profile_click.emit(profile.name);
    }

    ngAfterViewInit(): void {
    }

    openNewProfileForm() {
        this.windowService.open(HHProfileFormComponent,
            {title: `New Half-Hourly Profile`});
    }

}
