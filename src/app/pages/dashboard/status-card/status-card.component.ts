import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-status-card',
    styleUrls: ['./status-card.component.scss'],
    template: `
        <nb-card (click)="onClick()" class="hvr-underline-from-center">
            <div class="icon-container">
                <div class="icon status-{{ type }}">
                    <ng-content></ng-content>
                </div>
            </div>

            <div class="details">
                <div class="title h5">{{ title }}</div>
            </div>
        </nb-card>
    `,
})
export class StatusCardComponent {

    @Input() title: string;
    @Input() type: string;
    @Input() route2Link = true;

    constructor(private router: Router) {

    }

    onClick() {
        this.router.navigate([this.route2Link]);
    }
}
