import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';

interface CardSettings {
    title: string;
    iconClass: string;
    type: string;
    url: string;
}

@Component({
    selector: 'ngx-landing',
    styleUrls: ['./landing.component.scss'],
    templateUrl: './landing.component.html',
})
export class LandingComponent implements OnDestroy {

    private alive = true;

    mpanCard: CardSettings = {
        title: 'Customer 360',
        iconClass: 'nb-lightbulb',
        type: 'success',
        url: '/pages/customer',
    };
    assetDetails: CardSettings = {
        title: 'Asset Management',
        iconClass: 'nb-power-circled',
        type: 'success',
        url: '/pages/asset-details',
    };
    tariffDetails: CardSettings = {
        title: 'Tariff Management',
        iconClass: 'nb-power-circled',
        type: 'success',
        url: '/pages/tariff-details',
    };
    debtManagement: CardSettings = {
        title: 'Debt Management',
        iconClass: 'nb-power-circled',
        type: 'success',
        url: '/pages/debt-management',
    };
    cashPostings: CardSettings = {
        title: 'Cash Postings',
        iconClass: 'nb-power-circled',
        type: 'success',
        url: '/pages/cash-postings',
    };
    bulkImport: CardSettings = {
        title: 'Bulk Import',
        iconClass: 'nb-list',
        type: 'info',
        url: '/pages/bulk-import',
    };
    reporting: CardSettings = {
        title: 'Report Management',
        iconClass: 'nb-expand',
        type: 'info',
        url: '/pages/report',
    };
    admin: CardSettings = {
        title: 'Admin Management',
        iconClass: 'nb-gear',
        type: 'warning',
        url: '/pages/dashboard',
    };

    statusCards: CardSettings[];

    commonStatusCardsSet: CardSettings[] = [
        this.mpanCard,
        this.tariffDetails,
        this.assetDetails,
        this.debtManagement,
        this.cashPostings,
        this.bulkImport,
        this.reporting,
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
