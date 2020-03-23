import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';

interface CardSettings {
    title: string;
    iconClass: string;
    type: string;
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
    };
    siteDetails: CardSettings = {
        title: 'Site Details',
        iconClass: 'nb-roller-shades',
        type: 'success',
    };
    cableDetails: CardSettings = {
        title: 'Cable Details',
        iconClass: 'nb-audio',
        type: 'info',
    };
    admin: CardSettings = {
        title: 'Admin Details',
        iconClass: 'nb-cube-outline',
        type: 'warning',
    };

    statusCards: string;

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
