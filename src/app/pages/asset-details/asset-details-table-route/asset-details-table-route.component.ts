import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-asset-details-table-route',
    template: `
        <a class="hvr-grow"
           [routerLink]="'/pages/asset-details/' + value"
           routerLinkActive="active">
            <span>
                <nb-icon icon="arrow-right" pack="eva" status="primary"></nb-icon>
                {{ renderValue }}
            </span>
        </a>
    `,
    styles: []
})
export class AssetDetailsTableRouteComponent implements OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }
}
