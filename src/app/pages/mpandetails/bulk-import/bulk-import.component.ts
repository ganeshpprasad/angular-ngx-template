import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IBulkImportResponse, IMPANDetailsAPIService} from "../../../@providers/data/mpandetails";
import {ServerHTTPResponse} from "../../../@core/data/http-response";
import {LocalDataSource} from "ng2-smart-table";
import {MpanDetailsTableRouteComponent} from "../mpan-details-table-route/mpan-details-table-route.component";

@Component({
    selector: 'ngx-bulk-import',
    templateUrl: './bulk-import.component.html',
    styleUrls: ['./bulk-import.component.scss']
})
export class BulkImportComponent implements OnInit {

    @ViewChild('inputFile', {static: true}) inputFileEleRef: ElementRef;
    spinner_loading = false;
    selectedFiles: FileList = undefined;
    serverResponse: any = {};
    errDatasource: LocalDataSource = new LocalDataSource();
    mpansDatasource: LocalDataSource = new LocalDataSource();
    displayErr = false;
    displayMpans = false;

    errTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false
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
            delete: false
        },
        columns: {
            Mpan_no: {
                title: 'MPAN ID',
                type: 'custom',
                editable: false,
                renderComponent: MpanDetailsTableRouteComponent,
            },
            Customer_Name: {
                title: 'Customer Name',
                type: 'string',
                editable: false,
            },
            Address_1: {
                title: 'Address',
                type: 'string',
                editable: false,
            },
            Postcode: {
                title: 'Postcode',
                type: 'string',
                editable: false,
            },
        },
    };

    get isSelectedFile() {
        return this.selectedFiles != undefined;
    }

    constructor(private mpanDetailsAPIService: IMPANDetailsAPIService) {
    }

    ngOnInit() {
    }

    processErrorResponse(res: ServerHTTPResponse<IBulkImportResponse>) {
        this.serverResponse = res;
        this.displayErr = true;
        this.displayMpans = false;
        this.errDatasource.load(res.result.errors);
        return;
    }

    processMpansResponse(res: ServerHTTPResponse<IBulkImportResponse>) {
        this.serverResponse = res;
        this.displayMpans = true;
        this.displayErr = false;
        this.mpansDatasource.load(res.result.Mpans);
        return;
    }

    resetPage() {
        this.selectedFiles = undefined;
        this.serverResponse = {};
        this.displayMpans = false;
        this.displayErr = false;
    }

    fileChange($event) {
        this.resetPage();
        this.selectedFiles = $event.target.files;
        return;
    }

    onUploadFiles() {
        this.spinner_loading = true;
        this.mpanDetailsAPIService
            .bulkUploadMpans(this.selectedFiles)
            .subscribe(
                (res: ServerHTTPResponse<IBulkImportResponse>) => {
                    console.log(res);
                    if (res.result.errors.length != 0) {
                        this.processErrorResponse(res);
                    }
                    else if (res.result.Mpans.length != 0) {
                        this.processMpansResponse(res);
                    }
                    this.spinner_loading = false;
                },
                (err: any) => {
                    // Something went wrong in calling the RESTAPI
                    console.log(err);
                    this.spinner_loading = false;
                }
            )
    }

    clearSelectedFile() {
        this.selectedFiles = undefined;
        this.inputFileEleRef.nativeElement.value = "";
    }
}
