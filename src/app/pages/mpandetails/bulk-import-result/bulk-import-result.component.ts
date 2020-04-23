import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {IBulkImportResponse, IMpanImportApiService} from '../../../@providers/data/mpanimport';
import {LocalDataSource} from 'ng2-smart-table';
import {MpanDetailsTableRouteComponent} from '../mpan-details-table-route/mpan-details-table-route.component';

@Component({
    selector: 'ngx-bulk-import-result',
    templateUrl: './bulk-import-result.component.html',
    styleUrls: ['./bulk-import-result.component.scss'],
})
export class BulkImportResultComponent implements OnInit {
    routed_id$: Observable<string>;
    spinner_loading = false;
    serverResponse: any = {};
    errDatasource: LocalDataSource = new LocalDataSource();
    mpansDatasource: LocalDataSource = new LocalDataSource();
    displayErr = false;
    displayMpans = false;

    errTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            row_id: {
                title: 'Row ID',
                type: 'string',
                editable: false,
            },
            error: {
                title: 'Error Message',
                type: 'string',
                editable: false,
            },
        },
    };
    mpanTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            mpan_no: {
                title: 'MPAN ID',
                type: 'custom',
                editable: false,
                renderComponent: MpanDetailsTableRouteComponent,
            },
            customer_Name: {
                title: 'Customer Name',
                type: 'string',
                editable: false,
            },
            address_1: {
                title: 'Address',
                type: 'string',
                editable: false,
            },
            postcode: {
                title: 'Postcode',
                type: 'string',
                editable: false,
            },
        },
    };

    constructor(private route: ActivatedRoute,
                private router: Router,
                private mpanImportApiService: IMpanImportApiService) {
    }

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        this.routed_id$.subscribe((id) => this.get_task_details(id));
    }

    get_task_details(task_id: string) {
        console.log('On get task details...');
        this.spinner_loading = true;
        this.mpanImportApiService
            .getTaskData(task_id)
            .subscribe(
                (res: IBulkImportResponse) => {
                    console.log(res.json);
                    if (res.json.errors.length !== 0) {
                        this.processErrorResponse(res);
                    } else if (res.json.mpans.length !== 0) {
                        this.processMpansResponse(res);
                    }
                    this.spinner_loading = false;
                },
                (err: any) => {
                    // Something went wrong in calling the RESTAPI
                    console.log(err);
                    this.spinner_loading = false;
                },
            );
    }

    processErrorResponse(res: IBulkImportResponse) {
        this.serverResponse = res;
        this.displayErr = true;
        this.displayMpans = false;
        this.errDatasource.load(res.json.errors);
        return;
    }

    processMpansResponse(res: IBulkImportResponse) {
        this.serverResponse = res;
        this.displayMpans = true;
        this.displayErr = false;
        this.mpansDatasource.load(res.json.mpans);
        return;
    }

    onClickBack() {
        this.router.navigate(['/pages/bulk-import', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/dashboard', {}], {relativeTo: this.route});
    }
}
