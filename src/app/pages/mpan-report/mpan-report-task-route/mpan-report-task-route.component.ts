import {Component, Input, OnInit} from '@angular/core';
import {IMpanReportApiService, IMpanReportTask} from '../../../@providers/data/mpanreport';
import {map} from 'rxjs/operators';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';

@Component({
    selector: 'ngx-mpan-import-task-table-route',
    template: `
        <button nbButton fullWidth ghost
                status="warning"
                (click)="onDownload()">
            <nb-icon icon="arrow-circle-down-outline" pack="eva"></nb-icon>
            {{ renderValue }}
        </button>
    `,
})
export class MpanReportTaskRouteComponent implements OnInit {
    renderValue: string;

    @Input() value: string;
    @Input() rowData: any;

    constructor(private mpanReportApiService: IMpanReportApiService,
                private toastrService: NbToastrService) {
    }


    ngOnInit() {
        this.renderValue = 'download task: ' + this.value.toString().toUpperCase();
    }

    onDownload() {
        console.log(`download report for task ${this.value}`);
        const task_id = this.value;
        this.getTaskStatus(task_id)
            .subscribe((state: string) => {
                    if (state === 'Finished') {
                        this.downloadMpanReport(task_id);
                    } else if (state === 'Error') {
                        this.showToast('ERR: Report has errors',
                            'Please try again later.',
                            'danger',
                            'save-outline');
                    } else if (state === 'In Progress') {
                        this.showToast('WARNING: Report In Progress',
                            'Please try to download after its finished.',
                            'warning',
                            'save-outline');
                    }
                },
            );
        return;
    }

    getTaskStatus(task_id: string) {
        return this.mpanReportApiService
            .getReportTaskStatus(task_id)
            .pipe(
                map((res: IMpanReportTask) => res.state),
            );
    }

    downloadMpanReport(task_id: string) {
        this.mpanReportApiService
            .downloadReport(task_id)
            .subscribe(x => {
                const newBlob = new Blob([x],
                    {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                //
                const data = window.URL.createObjectURL(newBlob);
                const link = document.createElement('a');
                link.href = data;
                link.download = 'mpan_report.xlsx';
                link.click();
            });
    }

    private showToast(title: string, body: string, status: NbComponentStatus, icon: string) {
        const config: Partial<NbToastrConfig> = {
            status: status,
            destroyByClick: true,
            duration: 7500,
            hasIcon: true,
            icon: icon,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
        };
        const titleContent = title ? `${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}

