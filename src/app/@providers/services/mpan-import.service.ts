import {Injectable} from '@angular/core';
import {IBulkImportResponse, IMpanImportApiService, IMpanImportTask} from '../data/mpanimport';
import {Observable} from 'rxjs/Observable';
import {ServerHTTPResponse} from '../../@core/data/http-response';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable()
export class MpanImportApiService extends IMpanImportApiService {
    private mpan_url = environment.baseUrl + '/api/v1/mpan_import';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {
        super();
    }

    bulkImportMpans(fileList: FileList): Observable<ServerHTTPResponse<any>> {
        const import_url: string = this.mpan_url + '/bulk_import';
        //
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        //
        const httpOptions = {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
            }),
        };
        return this.http
            .post<ServerHTTPResponse<any>>(import_url, formData, httpOptions)
            .pipe(
                catchError(this.handleUploadError),
            );
    }

    getTaskData(taskId: string): Observable<IBulkImportResponse> {
        const list_tasks: string = this.mpan_url + '/download';
        const post_body = {
            'id': taskId,
        };
        return this.http
            .post<ServerHTTPResponse<IBulkImportResponse>>(list_tasks, post_body, this.httpOptions)
            .pipe(
                map(r => r.result),
            );
    }

    getTaskStatus(taskId: string): Observable<IMpanImportTask[]> {
        const list_tasks: string = this.mpan_url + '/list_tasks';
        const post_body = {
            'id': taskId,
        };
        return this.http
            .post<ServerHTTPResponse<IMpanImportTask[]>>(list_tasks, post_body, this.httpOptions)
            .pipe(
                map(r => r.result['tasks']),
            );
    }

    getAllTasksStatus(): Observable<IMpanImportTask[]> {
        const list_tasks: string = this.mpan_url + '/list_tasks';
        const post_body = {};
        return this.http
            .post<ServerHTTPResponse<IMpanImportTask[]>>(list_tasks, post_body, this.httpOptions)
            .pipe(
                map(r => r.result['tasks']),
            );
    }

    protected handleUploadError(error: HttpErrorResponse) {
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
