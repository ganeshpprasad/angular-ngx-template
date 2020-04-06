import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbSearchComponent, NbSearchService} from "@nebular/theme";
import {Subscription} from "rxjs";
import {IMPANDetailsAPIService, IMpanLists} from "../../../@providers/data/mpandetails";
import {LocalDataSource} from "ng2-smart-table";
import {MpanDetailsTableRouteComponent} from "../mpan-details-table-route/mpan-details-table-route.component";

@Component({
    selector: 'ngx-mpan-details-search',
    templateUrl: './mpan-details-search.component.html',
    styleUrls: ['./mpan-details-search.component.scss']
})
export class MpanDetailsSearchComponent implements OnInit, OnDestroy {

    @ViewChild(NbSearchComponent, {static: false}) searchButton: NbSearchComponent;
    searchResultVisible: boolean = false;
    noSearchResultReturned = false;
    spinner_loading = false;
    private searchSubmit: Subscription;
    mpanDataSource: LocalDataSource = new LocalDataSource();
    mpanTableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false
        },
        columns: {
            mpan_no: {
                title: 'MPAN ID',
                type: 'custom',
                editable: false,
                renderComponent: MpanDetailsTableRouteComponent,
            },
            meter: {
                title: 'Meter Id',
                type: 'string',
                editable: false,
            },
            address: {
                title: 'Address',
                type: 'string',
                editable: false,
            },
            postcode: {
                title: 'Postcode',
                type: 'string',
                editable: false,
            },
        },
    };

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
                });
    }


    // noinspection JSMethodCanBeStatic
    onMpanSearchSubmit(term: string) {
        //
        this.searchResultVisible = false;
        this.noSearchResultReturned = false;
        this.spinner_loading = true;
        this.mpanAPIService
            .searchMPAN(term)
            .subscribe(
                (results: IMpanLists) => {
                    if (results.mpans.length == 0) {
                        this.noSearchResultReturned = true;
                    } else {
                        this.searchResultVisible = true;
                        this.loadMpanSearchResults(results);
                    }
                    setTimeout(() => this.spinner_loading = false, 750);
                },
                (err) => {
                    // Something unhandled went wrong..
                    console.log(err);
                    this.searchResultVisible = false;
                    this.spinner_loading = false;
                });
        return;
    }

    private loadMpanSearchResults(searchResult: IMpanLists) {
        let tabledata = searchResult
            .mpans
            .map((mpan) => {
                let meter, address, postcode = "";
                if (mpan.meter) {
                    meter = mpan.meter.meter_fk;
                }
                if (mpan.mpan_address) {
                    address = mpan.mpan_address.address_1;
                    postcode = mpan.mpan_address.post_code;
                }
                return {
                    mpan_no: mpan.id,
                    meter: meter,
                    address: address,
                    postcode: postcode
                }
            });
        this.mpanDataSource.load(tabledata);
    }

    ngOnDestroy(): void {
        this.searchSubmit.unsubscribe();
    }

    onClickSearchForMpan($event: any): void {
        this.searchButton.openSearch()
    }

}
