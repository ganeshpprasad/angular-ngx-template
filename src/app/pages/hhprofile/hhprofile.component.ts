import {Component} from '@angular/core';

@Component({
    selector: 'ngx-hh-profile',
    styleUrls: ['./hhprofile.component.scss'],
    templateUrl: './hhprofile.component.html',
})
export class HHProfileComponent {

    selectedProfile: string = 'Profile- 1';

    constructor() {

    }

    onProfileClick($event: any) {
        console.log($event);
        this.selectedProfile = $event;
    }

}
