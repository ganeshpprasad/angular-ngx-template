import {Observable} from 'rxjs';
import {ServerHTTPResponse} from '../../@core/data/http-response';

export interface IMpanReportTask {
    id: string;
    task_type: string;
    file_path: string;
    state: string;
    error: string;
    created: string;
    updated: string;
}

export interface IMpanReportTasksList {
    tasks: IMpanReportTask[];
}


export abstract class IMpanReportApiService {
    abstract generateNewMpanReport(): Observable<string>;

    abstract getReportTaskStatus(taskId: string): Observable<IMpanReportTask>;

    abstract getAllTasksStatus(): Observable<IMpanReportTasksList>;

    abstract downloadReport(taskId: string): Observable<Blob>;
}
