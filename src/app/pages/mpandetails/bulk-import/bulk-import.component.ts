import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ServerHTTPResponse} from '../../../@core/data/http-response';
import {LocalDataSource} from 'ng2-smart-table';
import {IMpanImportApiService, IMpanImportTask} from '../../../@providers/data/mpanimport';
import {timer} from 'rxjs';
import {
    MpanImportTaskTableRouteComponent,
} from '../mpan-import-task-table-route/mpan-import-task-table-route.component';

@Component({
    selector: 'ngx-bulk-import',
    templateUrl: './bulk-import.component.html',
    styleUrls: ['./bulk-import.component.scss'],
})
export class BulkImportComponent implements OnInit, OnDestroy {

    @ViewChild('inputFile', {static: true}) inputFileEleRef: ElementRef;
    spinner_loading = false;
    selectedFiles: FileList = undefined;
    update_task: boolean = false;
    fetch_task_id: string = undefined;
    progress_value: Number = 0;
    progress_text: string = 'Bulk Import Mpans..';
    tasksDatasource: LocalDataSource = new LocalDataSource();
    tasksTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            id: {
                title: 'Task ID',
                type: 'custom',
                editable: false,
                renderComponent: MpanImportTaskTableRouteComponent,
            },
            task_type: {
                title: 'Task Type',
                type: 'string',
                editable: false,
            },
            state: {
                title: 'Task State',
                type: 'string',
                editable: false,
            },
            created: {
                title: 'Created On',
                type: 'string',
                editable: false,
            },
            updated: {
                title: 'Updated On',
                type: 'string',
                editable: false,
            },
        },
    };


    get isSelectedFile() {
        return this.selectedFiles !== undefined;
    }

    constructor(private mpanImportApiService: IMpanImportApiService) {
    }

    ngOnInit() {
        this.getAllTasksStatus();
    }

    private fetchTaskStatusPeriodic = timer(0, 500)
        .subscribe(() => {
            if (this.update_task) {
                if (this.fetch_task_id !== undefined) {
                    console.log('will fetch task', this.fetch_task_id);
                    this.progress_value = 75;
                    this.getTaskStatus(this.fetch_task_id);
                    this.getAllTasksStatus();
                }
            }
        });

    ngOnDestroy() {
        this.fetchTaskStatusPeriodic.unsubscribe();
    }

    resetPage() {
        this.selectedFiles = undefined;
        this.progress_value = 0;
        this.fetch_task_id = undefined;
        this.update_task = false;
        this.progress_text = 'Bulk Import Mpans..';
    }

    onUploadFiles() {
        console.log('On upload files...');
        this.spinner_loading = true;
        this.progress_value = 0;
        this.mpanImportApiService
            .bulkImportMpans(this.selectedFiles)
            .subscribe(
                (res: ServerHTTPResponse<any>) => {
                    console.log(res);
                    this.fetch_task_id = res.result['task_id'];
                    console.log(this.fetch_task_id);
                    this.progress_value = 30;
                    this.progress_text = `Bulk Import: Task ${this.fetch_task_id} in progress..`;
                    this.update_task = true;
                    this.spinner_loading = false;
                },
                (err: any) => {
                    // Something went wrong in calling the RESTAPI
                    console.log(err);
                    this.spinner_loading = false;
                },
            );
    }

    getTaskStatus(task_id: string) {
        console.log(`Get task status: ${task_id}`);
        this.mpanImportApiService
            .getTaskStatus(task_id)
            .subscribe(
                (res: IMpanImportTask[]) => {
                    console.log(res[0]);
                    const state = res[0]['state'];
                    console.log(state);
                    if (state === 'Finished') {
                        this.progress_text = `Bulk Import: Finished Task ${this.fetch_task_id}`;
                        this.progress_value = 100;
                        this.update_task = false;
                        this.fetch_task_id = undefined;
                    } else if (state === 'Error') {
                        this.progress_text = `Bulk Import: Error on Task ${this.fetch_task_id}`;
                        this.progress_value = 100;
                        this.update_task = false;
                        this.fetch_task_id = undefined;
                    }
                },
                (err: any) => {
                    // Something went wrong in calling the RESTAPI
                    console.log(err);
                },
            );
    }

    getAllTasksStatus() {
        console.log('Get all task status..');
        this.mpanImportApiService
            .getAllTasksStatus()
            .subscribe(
                (res: IMpanImportTask[]) => {
                    res = res.sort((n1, n2) => (n1.id > n2.id ? -1 : 1));
                    this.tasksDatasource.load(res);
                },
                (err: any) => {
                    // Something went wrong in calling the RESTAPI
                    console.log(err);
                },
            );
    }

    fileChange($event) {
        this.resetPage();
        this.selectedFiles = $event.target.files;
        return;
    }

    clearSelectedFile() {
        this.resetPage();
        this.inputFileEleRef.nativeElement.value = '';
    }
}
