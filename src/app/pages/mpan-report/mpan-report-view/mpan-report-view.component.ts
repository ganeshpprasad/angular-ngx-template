import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMpanReportApiService, IMpanReportTask, IMpanReportTasksList} from '../../../@providers/data/mpanreport';
import {LocalDataSource} from 'ng2-smart-table';
import {timer} from 'rxjs';
import {MpanReportTaskRouteComponent} from '../mpan-report-task-route/mpan-report-task-route.component';

@Component({
    selector: 'ngx-mpan-report-view',
    templateUrl: './mpan-report-view.component.html',
    styleUrls: ['./mpan-report-view.component.scss'],
})
export class MpanReportViewComponent implements OnInit, OnDestroy {
    tasksDatasource: LocalDataSource = new LocalDataSource();
    tasksTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        pager: {
            perPage: 5,
        },
        columns: {
            id: {
                title: 'Task ID',
                type: 'custom',
                editable: false,
                renderComponent: MpanReportTaskRouteComponent,
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
    progress_value: Number = 0;
    progress_text: string = 'In Progress';
    private update_task: boolean = false;
    private fetch_task_id: string = undefined;

    constructor(private mpanReportApiService: IMpanReportApiService) {
    }

    ngOnInit() {
        this.getAllTasksStatus();
    }

    ngOnDestroy(): void {
        this.fetchTaskStatusPeriodic.unsubscribe();
    }

    private fetchTaskStatusPeriodic = timer(0, 1000)
        .subscribe(() => {
            if (this.update_task) {
                if (this.fetch_task_id !== undefined) {
                    console.log('will fetch task', this.fetch_task_id);
                    this.progress_value = 75;
                    this.progress_text = `Task ${this.fetch_task_id} in progress..`;
                    this.getTaskStatus(this.fetch_task_id);
                    this.getAllTasksStatus();
                }
            }
        });

    getAllTasksStatus() {
        console.log('MPAN REPORT: Get all task status..');
        this.mpanReportApiService
            .getAllTasksStatus()
            .subscribe(
                (res: IMpanReportTasksList) => {
                    let tasks = res.tasks;
                    tasks = tasks.sort((n1, n2) => n1.id > n2.id ? -1 : 1);
                    this.tasksDatasource.load(tasks);
                },
                (err: any) => {
                    // Something went wrong in calling the RESTAPI
                    console.log(err);
                },
            );
    }

    generateNewReport() {
        console.log('GENERATE NEW REPORT');
        //
        this.progress_value = 30;
        this.mpanReportApiService
            .generateNewMpanReport()
            .subscribe(
                (task_id: string) => {
                    console.log(task_id);
                    this.progress_value = 50;
                    this.update_task = true;
                    this.fetch_task_id = task_id;
                },
            );
    }

    getTaskStatus(task_id: string) {
        console.log(`Get report task status: ${task_id}`);
        this.mpanReportApiService
            .getReportTaskStatus(task_id)
            .subscribe(
                (res: IMpanReportTask) => {
                    const state = res.state;
                    console.log(state);
                    if (state === 'Finished') {
                        this.progress_text = `MPAN Report: Finished Task ${this.fetch_task_id}`;
                        this.progress_value = 100;
                        this.update_task = false;
                        this.fetch_task_id = undefined;
                    } else if (state === 'Error') {
                        this.progress_text = `MPAN Report: Error on Task ${this.fetch_task_id}`;
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

}
