import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';

interface CardSettings {
    title: string;
    iconClass: string;
    type: string;
    url: string,
}

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

    private alive = true;

    mpanCard: CardSettings = {
        title: 'MPANs',
        iconClass: 'nb-lightbulb',
        type: 'primary',
        url: '/pages/mpan-details',
    };
    siteDetails: CardSettings = {
        title: 'Asset/ Site Details',
        iconClass: 'nb-power-circled',
        type: 'success',
        url: '/pages/asset-details',
    };
    cableDetails: CardSettings = {
        title: 'Event Logs',
        iconClass: 'nb-list',
        type: 'info',
        url: '/pages/event-details',
    };
    admin: CardSettings = {
        title: 'Admin Details',
        iconClass: 'nb-gear',
        type: 'warning',
        url: '/pages/',
    };

    statusCards: CardSettings[];

    commonStatusCardsSet: CardSettings[] = [
        this.mpanCard,
        this.siteDetails,
        this.cableDetails,
        this.admin,
    ];

    statusCardsByThemes: {
        default: CardSettings[];
        cosmic: CardSettings[];
        corporate: CardSettings[];
        dark: CardSettings[];
    } = {
        default: this.commonStatusCardsSet,
        cosmic: this.commonStatusCardsSet,
        corporate: this.commonStatusCardsSet,
        dark: this.commonStatusCardsSet,
    };

    constructor(private themeService: NbThemeService) {
        this.themeService.getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(theme => {
                this.statusCards = this.statusCardsByThemes[theme.name];
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
