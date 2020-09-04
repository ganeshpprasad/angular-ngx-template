import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbSearchComponent, NbSearchService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {
  ICustomerDetails,
  ICustomerDetailsAPIService,
} from '../../../@providers/data/customer-details';
import { CustomerDetailsTableRouteComponent } from '../customer-details-table-route/customer-details-table-route.component';

@Component({
  selector: 'ngx-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
})
export class CustomerSearchComponent implements OnInit, OnDestroy {
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
      customer_id: {
        title: 'Customer ID',
        type: 'custom',
        editable: false,
        renderComponent: CustomerDetailsTableRouteComponent,
        width: '50px',
      },
      full_name: {
        title: 'Customer Name',
        type: 'string',
        editable: false,
        width: '50px',
      },
      postcode: {
        title: 'Postcode',
        type: 'string',
        editable: false,
        width: '50px',
      },
    },
  };

  constructor(
        private route: ActivatedRoute,
        private router: Router,
    private searchService: NbSearchService,
    private customerAPIService: ICustomerDetailsAPIService,
  ) {}

  ngOnInit() {
    this.searchSubmit = this.searchService
      .onSearchSubmit()
      .subscribe((s: { term: string; tag?: string }) => {
        if (s.tag === 'customer-search') {
          this.onCustomerSearchSubmit(s.term);
        }
      });
  }

  // noinspection JSMethodCanBeStatic
  onCustomerSearchSubmit(term: string) {
    this.searchResultVisible = false;
    this.noSearchResultReturned = false;
    this.spinner_loading = true;
    this.customerAPIService.searchCustomer(term).subscribe(
      (results: ICustomerDetails[]) => {
        this.searchResultVisible = true;
        const resultsCount = results.length;
        if (resultsCount == 0) {
          this.noSearchResultReturned = true;
        } else {
          this.searchResultCount = resultsCount;
          this.loadSearchResults(results);
        }
        setTimeout(() => (this.spinner_loading = false), 750);
      },
      (err) => {
        // Something unhandled went wrong..
        console.log(err);
        this.searchResultVisible = false;
        this.spinner_loading = false;
      },
    );
    return;
  }

  private loadSearchResults(searchResult: ICustomerDetails[]) {
    const table_data = searchResult.map((customer) => {
      let _name;
      if (customer.full_name) {
        _name = customer.full_name.toUpperCase();
      } else if (customer.company_name) {
        _name = customer.company_name.toUpperCase();
      }
      return {
        customer_id: customer.customer_id,
        full_name: _name,
        postcode: customer.billing_address.postcode,
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
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/landing', {}], {
            relativeTo: this.route,
        });
    }
}
