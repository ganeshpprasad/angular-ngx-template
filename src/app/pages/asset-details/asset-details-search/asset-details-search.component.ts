import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NbSearchComponent, NbSearchService} from "@nebular/theme";
import {IAssetDetailsAPIService, IAssetDetailsList} from "../../../@providers/data/assetdetails";
import {LocalDataSource} from "ng2-smart-table";
import {AssetDetailsTableRouteComponent} from "../asset-details-table-route/asset-details-table-route.component";

@Component({
    selector: 'ngx-asset-details-search',
    templateUrl: './asset-details-search.component.html',
    styleUrls: ['./asset-details-search.component.scss']
})
export class AssetDetailsSearchComponent implements OnInit, OnDestroy {

    @ViewChild(NbSearchComponent, {static: false}) searchButton: NbSearchComponent;
    spinner_loading = false;
    searchResultVisible: boolean = false;
    noSearchResultReturned = false;
    private searchSubmit: Subscription;
    assetDataSource: LocalDataSource = new LocalDataSource();
    assetTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false
        },
        columns: {
            id: {
                title: 'Asset ID',
                type: 'custom',
                editable: false,
                renderComponent: AssetDetailsTableRouteComponent,
            },
            business_reference: {
                title: 'Business Ref #',
                type: 'string',
                editable: false,
            },
            description: {
                title: 'description',
                type: 'string',
                editable: false,
            },
        },
    };

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
        this.searchResultVisible = false;
        this.noSearchResultReturned = false;
        this.spinner_loading = true;
        this.assetDetailsAPIService
            .searchAssetDetails(term)
            .subscribe((results: IAssetDetailsList) => {
                    if (results.result.length == 0) {
                        this.noSearchResultReturned = true;
                    } else {
                        this.searchResultVisible = true;
                        this.loadAssetSearchResults(results);
                    }
                    setTimeout(() => this.spinner_loading = false, 750);
                },
                (err) => {
                    console.log(err);
                    this.spinner_loading = false;
                });
        return;
    }

    private loadAssetSearchResults(searchResult: IAssetDetailsList) {
        this.assetDataSource.load(searchResult.result);
    }

    ngOnDestroy(): void {
        this.searchSubmit.unsubscribe();
    }

    onClickSearchForAsset($event: any): void {
        this.searchButton.openSearch()
    }
}
