import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {Subscription} from "rxjs";
import {IMPANDetailsAPIService, IMpanLists} from "../../../@providers/data/mpandetails";

@Component({
    selector: 'ngx-mpan-details-search',
    templateUrl: './mpan-details-search.component.html',
    styleUrls: ['./mpan-details-search.component.scss']
})
export class MpanDetailsSearchComponent implements OnInit, OnDestroy {

    private searchSubmit: Subscription;
    searchMpanResults: IMpanLists = {
        mpans: [],
    };
    searchResultVisible: boolean = false;

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
        this.mpanAPIService
            .searchMPAN(term)
            .subscribe((results: IMpanLists) => {
                this.searchResultVisible = true;
                this.searchMpanResults = results;
            });
        return;
    }

    ngOnDestroy(): void {
        this.searchSubmit.unsubscribe();
    }

}
