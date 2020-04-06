import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-mpan-details-table-route',
    template: `
        <a class="hvr-grow"
           [routerLink]="'/pages/mpan-details/' + value"
           routerLinkActive="active">
            <span>
                <nb-icon icon="arrow-right" pack="eva" status="info"></nb-icon>
                {{ renderValue }}
            </span>
        </a>
    `,
})
export class MpanDetailsTableRouteComponent implements OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }
}
