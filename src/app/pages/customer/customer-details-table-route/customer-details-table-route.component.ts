import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-customer-details-table-route',
    templateUrl: './customer-details-table-route.component.html',
    styleUrls: ['./customer-details-table-route.component.scss'],
})
export class CustomerDetailsTableRouteComponent implements OnInit {
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }
}


