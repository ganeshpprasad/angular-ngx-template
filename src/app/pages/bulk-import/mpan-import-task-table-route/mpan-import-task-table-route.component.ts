import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-mpan-import-task-table-route',
    template: `
        <a class="hvr-grow"
           [routerLink]="'/pages/bulk-import/result/' + value"
           routerLinkActive="active">
            <span>
                <nb-icon icon="arrow-right" pack="eva" status="warning"></nb-icon>
                {{ renderValue }}
            </span>
        </a>
    `,
})
export class MpanImportTaskTableRouteComponent implements OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.renderValue = 'task: ' + this.value.toString().toUpperCase();
    }
}
