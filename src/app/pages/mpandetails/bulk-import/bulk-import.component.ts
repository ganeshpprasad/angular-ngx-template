import {Component, OnInit} from '@angular/core';
import {IBulkImportResponse, IMPANDetailsAPIService} from "../../../@providers/data/mpandetails";
import {ServerHTTPResponse} from "../../../@core/data/http-response";

@Component({
    selector: 'ngx-bulk-import',
    templateUrl: './bulk-import.component.html',
    styleUrls: ['./bulk-import.component.scss']
})
export class BulkImportComponent implements OnInit {

    serverResponse: any = {};

    constructor(private mpanDetailsAPIService: IMPANDetailsAPIService) {
    }

    ngOnInit() {
    }

    fileChange($event) {
        this.serverResponse = {};
        let fileList: FileList = $event.target.files;
        // console.log(fileList);
        this.mpanDetailsAPIService
            .bulkUploadMpans(fileList)
            .subscribe(
                (res: ServerHTTPResponse<IBulkImportResponse>) => {
                    console.log(res);
                    this.serverResponse = res;
                },
                (err: any) => {
                    console.log(err);
                }
            )
    }
}
