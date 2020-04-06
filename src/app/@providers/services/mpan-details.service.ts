import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {IBulkImportResponse, IMPANDetailsAPIService, IMpanDetailsResponse, IMpanLists} from "../data/mpandetails";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ServerHTTPResponse} from "../../@core/data/http-response";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable()
export class MpanDetailsService extends IMPANDetailsAPIService {

    private mpan_url = environment.baseUrl + '/api/v1/mpan';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {
        super();
    }

    getMPANDetailsByID(mpanid: string): Observable<IMpanDetailsResponse> {
        let details_url: string = this.mpan_url + '/detail';
        let post_body = {
            'mpan_id': mpanid,
        };
        return this.http
            .post<ServerHTTPResponse<IMpanDetailsResponse>>(details_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.result)
            );
    }

    searchMPAN(query: string): Observable<IMpanLists> {
        let search_url: string = this.mpan_url + '/search';
        let post_body = {
            'free_text': query,
        };
        return this.http
            .post<ServerHTTPResponse<IMpanLists>>(search_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.result)
            );
    }

    updateMPANDetails(updateBody: IMpanDetailsResponse): Observable<string> {
        let update_url: string = this.mpan_url + '/update';
        let post_body = {
            'result': updateBody,
        };
        return this.http
            .put<ServerHTTPResponse<string>>(update_url, post_body, this.httpOptions)
            .pipe(
                map(r => r.message)
            );
    }

    bulkUploadMpans(fileList: FileList): Observable<ServerHTTPResponse<IBulkImportResponse>> {
        let import_url: string = this.mpan_url + '/bulk_import';
        //
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        //
        let httpOptions = {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
            }),
        };
        return this.http
            .post<ServerHTTPResponse<IBulkImportResponse>>(import_url, formData, httpOptions)
            .pipe(
                catchError(this.handleUploadError)
            );
    }

    private handleUploadError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('ERROR occurred on upload at client:', error.error.message);
            return;
        }

        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error.message}`);
        // Return just the error body
        return throwError(error.error);
    }

}