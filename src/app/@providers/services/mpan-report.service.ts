import {IMpanReportApiService, IMpanReportTask, IMpanReportTasksList} from '../data/mpanreport';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerHTTPResponse} from '../../@core/data/http-response';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class MpanReportService extends IMpanReportApiService {
    private _url = environment.baseUrl + '/api/v1/mpan_report';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {
        super();
    }

    downloadReport(taskId: string): Observable<Blob> {
        const download_report: string = this._url + '/download';
        const post_body = {
            id: taskId,
        };
        return this.http.post(download_report, post_body, {responseType: 'blob'});
    }

    generateNewMpanReport(): Observable<string> {
        const gen_report: string = this._url + '/mpan_report';
        return this.http
            .post<ServerHTTPResponse<any>>(gen_report, {}, this.httpOptions)
            .pipe(
                map(r => r.result['task_id']),
            );
    }

    getAllTasksStatus(): Observable<IMpanReportTasksList> {
        const gen_report: string = this._url + '/list_tasks';
        const post_body = {};
        return this.http
            .post<ServerHTTPResponse<any>>(gen_report, post_body, this.httpOptions)
            .pipe(
                map(r => r.result),
            );
    }

    getReportTaskStatus(taskId: string): Observable<IMpanReportTask> {
        const gen_report: string = this._url + '/list_tasks';
        const post_body = {
            'id': taskId,
        };
        return this.http
            .post<ServerHTTPResponse<any>>(gen_report, post_body, this.httpOptions)
            .pipe(
                map(r => r.result['tasks'][0]),
            );
    }
}
