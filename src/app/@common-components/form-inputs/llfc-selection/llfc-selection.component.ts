import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ILLFCSelectionService} from '../../../@providers/data/llfcselection';
import {NbDialogRef} from '@nebular/theme';

@Component({
    selector: 'ngx-llfc-selection',
    templateUrl: './llfc-selection.component.html',
    styleUrls: ['./llfc-selection.component.scss'],
})
export class LlfcSelectionComponent implements OnInit, AfterViewInit {
    @Input() input_llfc: number;
    vol_of_connection: string;
    dno_connection: string;
    mpan_loc: string;
    duos_tariff: string;
    selected_llfc: Number = undefined;

    constructor(public llfcSelectionService: ILLFCSelectionService,
                private cdr: ChangeDetectorRef,
                protected dialogRef: NbDialogRef<LlfcSelectionComponent>) {
    }

    ngOnInit() {
        const llfcs = this.llfcSelectionService.get_llfc_groupings();
        //
        this.vol_of_connection = this.llfcSelectionService.get_vol_of_connection_list()[0];
        this.dno_connection = this.llfcSelectionService.get_dno_connections_list()[0];
        this.mpan_loc = this.llfcSelectionService.get_dno_area_list()[0];
        this.duos_tariff = this.llfcSelectionService.get_duos_tarrif_list()[0];
    }

    ngAfterViewInit(): void {
        const llfcs = this.llfcSelectionService.get_llfc_groupings();
        if (this.input_llfc !== undefined) {
            const llfc_obj = llfcs.filter(
                l => l.llfc === Number(this.input_llfc),
            )[0];
            if (llfc_obj !== undefined) {
                this.vol_of_connection = llfc_obj.vol_of_connection;
                this.dno_connection = llfc_obj.dno_connection;
                this.mpan_loc = llfc_obj.dno_area;
                this.duos_tariff = llfc_obj.duos_tarrif;
                this.selected_llfc = Number(this.input_llfc);
            }
        }
        this.cdr.detectChanges();
    }


    onSubmit() {
        if (this.selected_llfc) {
            this.dialogRef.close(this.selected_llfc);
        }
    }

    filterLlfcList() {
        const llfcs = this.llfcSelectionService.get_llfc_groupings();
        return llfcs.filter(
            l => l.vol_of_connection === this.vol_of_connection &&
                l.dno_connection === this.dno_connection &&
                l.dno_area === this.mpan_loc &&
                l.duos_tarrif === this.duos_tariff,
        );
    }

    get_llfcs_list() {
        return this.filterLlfcList().map(l => l.llfc);
    }

    onSelectionChange() {
        this.selected_llfc = undefined;
    }
}
