import {Component} from '@angular/core';

@Component({
    selector: 'ngx-time-profile',
    styleUrls: ['./timeprofile.component.scss'],
    templateUrl: './timeprofile.component.html',
})
export class TimeProfileComponent {

    selectedProfile: string;

    constructor() {

    }

    onProfileClick($event: any) {
        this.selectedProfile = $event;
    }

    hideProfile(): boolean {
        return this.selectedProfile === undefined;
    }


}
