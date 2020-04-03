import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NbSearchComponent, NbSearchService} from "@nebular/theme";
import {IAssetDetailsAPIService, IAssetDetailsList} from "../../../@providers/data/assetdetails";

@Component({
    selector: 'ngx-asset-details-search',
    templateUrl: './asset-details-search.component.html',
    styleUrls: ['./asset-details-search.component.scss']
})
export class AssetDetailsSearchComponent implements OnInit, OnDestroy {

    @ViewChild(NbSearchComponent, {static: false}) searchButton: NbSearchComponent;
    searchResults: IAssetDetailsList = {result: [],};
    searchResultVisible: boolean = false;
    spinner_loading = false;
    private searchSubmit: Subscription;

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
        this.spinner_loading = true;
        this.assetDetailsAPIService
            .searchAssetDetails(term)
            .subscribe((results: IAssetDetailsList) => {
                    this.searchResultVisible = true;
                    this.searchResults = results;
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

    onClickSearchForAsset($event: any): void {
        this.searchButton.openSearch()
    }
}
