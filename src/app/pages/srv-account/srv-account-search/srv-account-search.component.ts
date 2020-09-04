import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NbSearchComponent, NbSearchService } from "@nebular/theme";
import { Subscription } from "rxjs";
import { LocalDataSource } from "ng2-smart-table";
import {
  ICustomerDetails,
  ICustomerDetailsAPIService,
} from "../../../@providers/data/customer-details";
import { SrvAccountTableRouteComponent } from "../srv-account-table-route/srv-account-table-route.component";
import {
  IServiceAccountDetails,
  IServiceAccountDetailsAPIService,
} from "../../../@providers/data/service-account";

@Component({
  selector: "ngx-srv-account-search",
  templateUrl: "./srv-account-search.component.html",
  styleUrls: ["./srv-account-search.component.scss"],
})
export class SrvAccountSearchComponent implements OnInit, OnDestroy {
  @ViewChild(NbSearchComponent, { static: false })
  searchButton: NbSearchComponent;
  searchResultVisible: boolean = false;
  searchResultCount: number = -1;
  noSearchResultReturned = false;
  spinner_loading = false;
  private searchSubmit: Subscription;
  localDataSource: LocalDataSource = new LocalDataSource();
  tableSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      service_id: {
        title: "Service ID",
        type: "custom",
        editable: false,
        renderComponent: SrvAccountTableRouteComponent,
      },
      customer_id: {
        title: "Customer ID",
        type: "string",
        editable: false,
      },
      asset_id: {
        title: "Asset ID",
        type: "string",
        editable: false,
      },
      service_type: {
        title: "Service Type",
        type: "string",
        editable: false,
      },
    },
  };

  constructor(
    private searchService: NbSearchService,
    private srvAccountAPIService: IServiceAccountDetailsAPIService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchSubmit = this.searchService
      .onSearchSubmit()
      .subscribe((s: { term: string; tag?: string }) => {
        if (s.tag === "srv-account-search") {
          this.onServiceAccountSearch(s.term);
        }
      });
  }

  // noinspection JSMethodCanBeStatic
  onServiceAccountSearch(term: string) {
    this.searchResultVisible = false;
    this.noSearchResultReturned = false;
    this.spinner_loading = true;
    this.srvAccountAPIService.searchServiceAccount(term).subscribe(
      (results: IServiceAccountDetails[]) => {
        this.searchResultVisible = true;
        this.searchResultCount = results.length;
        if (this.searchResultCount === 0) {
          this.noSearchResultReturned = true;
        } else {
          this.loadSearchResults(results);
        }
        setTimeout(() => (this.spinner_loading = false), 750);
      },
      (err) => {
        // Something unhandled went wrong..
        console.log(err);
        this.searchResultVisible = false;
        this.spinner_loading = false;
      }
    );
    return;
  }

  private loadSearchResults(searchResult: IServiceAccountDetails[]) {
    const table_data = searchResult.map((srv) => {
      return {
        service_id: srv.service_id,
        customer_id: srv.customer_id,
        asset_id: srv.asset_id,
        service_type: srv.service_type,
      };
    });
    this.localDataSource.load(table_data);
  }

  ngOnDestroy(): void {
    this.searchSubmit.unsubscribe();
  }

  onClickSearch($event: any): void {
    this.searchButton.openSearch();
  }

  onEventClick() {
    return;
  }

  onClickBack() {
    this.router.navigate(["../", {}], { relativeTo: this.route });
  }

  onClickHome() {
    this.router.navigate(["/pages/landing", {}], {
      relativeTo: this.route,
    });
  }
}
