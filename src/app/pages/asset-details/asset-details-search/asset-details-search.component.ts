import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NbSearchService} from "@nebular/theme";
import {IAssetDetailsAPIService, IAssetDetailsList} from "../../../@providers/data/assetdetails";

@Component({
    selector: 'ngx-asset-details-search',
    templateUrl: './asset-details-search.component.html',
    styleUrls: ['./asset-details-search.component.scss']
})
export class AssetDetailsSearchComponent implements OnInit, OnDestroy {

    private searchSubmit: Subscription;
    searchResults: IAssetDetailsList = {
        result: [],
    };
    searchResultVisible: boolean = false;

    constructor(private searchService: NbSearchService,
                private assetDetailsAPIService: IAssetDetailsAPIService) {

    }

    ngOnInit() {
        this.searchSubmit =
            this.searchService.onSearchSubmit()
                .subscribe((s: { term: string, tag?: string }) => {
                    if (s.tag === 'asset-details-search') {
                        this.onSearchSubmit(s.term);
                    }
                })
    }


    // noinspection JSMethodCanBeStatic
    onSearchSubmit(term: string) {
        //
        this.assetDetailsAPIService
            .searchAssetDetails(term)
            .subscribe((results: IAssetDetailsList) => {
                this.searchResultVisible = true;
                this.searchResults = results;
            });
        return;
    }

    ngOnDestroy(): void {
        this.searchSubmit.unsubscribe();
    }
}
