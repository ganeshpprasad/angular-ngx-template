import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbSearchComponent, NbSearchService} from "@nebular/theme";
import {Subscription} from "rxjs";
import {IMPANDetailsAPIService, IMpanLists} from "../../../@providers/data/mpandetails";

@Component({
    selector: 'ngx-mpan-details-search',
    templateUrl: './mpan-details-search.component.html',
    styleUrls: ['./mpan-details-search.component.scss']
})
export class MpanDetailsSearchComponent implements OnInit, OnDestroy {

    @ViewChild(NbSearchComponent, {static: false}) searchButton: NbSearchComponent;
    searchMpanResults: IMpanLists = {mpans: [],};
    searchResultVisible: boolean = false;
    spinner_loading = false;
    private searchSubmit: Subscription;

    constructor(private searchService: NbSearchService,
                private mpanAPIService: IMPANDetailsAPIService) {
    }

    ngOnInit() {
        this.searchSubmit =
            this.searchService.onSearchSubmit()
                .subscribe((s: { term: string, tag?: string }) => {
                    if (s.tag === 'mpan-search') {
                        this.onMpanSearchSubmit(s.term);
                    }
                })
    }


    // noinspection JSMethodCanBeStatic
    onMpanSearchSubmit(term: string) {
        //
        this.spinner_loading = true;
        this.mpanAPIService
            .searchMPAN(term)
            .subscribe((results: IMpanLists) => {
                    this.searchResultVisible = true;
                    this.searchMpanResults = results;
                    setTimeout(() => this.spinner_loading = false, 900);
                },
                (err) => {
                    console.log(err);
                    this.spinner_loading = false;
                });
        return;
    }

    ngOnDestroy(): void {
        this.searchSubmit.unsubscribe();
    }

    onClickSearchForMpan($event: any): void {
        this.searchButton.openSearch()
    }

}
