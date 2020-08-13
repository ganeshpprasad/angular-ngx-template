import {Observable} from 'rxjs';
import {ServerHTTPResponse} from '../../@core/data/http-response';

export interface IMpanImportTask {
    id: string;
    task_type: string;
    file_path: string;
    state: string;
    error: string;
    created: string;
    updated: string;
}

export interface IImportErr {
    error: string;
    row_id: string;
}

export interface IImportMpans {
    Address_1: string;
    Customer_Name: string;
    Mpan_no: string;
    Postcode: string;
}

export interface IBulkImportResponse {
    id: string;
    task_type: string;
    file_path: string;
    state: string;
    error: string;
    created: string;
    updated: string;
    json: {
        mpans: IImportMpans[];
        errors: IImportErr[];
    };
}

export abstract class IMpanImportApiService {
    abstract bulkImportMpans(fileList: FileList): Observable<ServerHTTPResponse<any>>;

    abstract getTaskStatus(taskId: string): Observable<IMpanImportTask[]>;

    abstract getAllTasksStatus(): Observable<IMpanImportTask[]>;

    abstract getTaskData(taskId: string): Observable<IBulkImportResponse>;
}
