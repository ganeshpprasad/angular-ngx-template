import { LocalDataSource } from "ng2-smart-table";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { flatMap, map } from "rxjs/operators";
import {
  IServiceAccountDetails,
  IServiceAccountDetailsAPIService,
} from "../../../@providers/data/service-account";
import {
  IBillInvoiceDetails,
  IBillInvoiceDetailsAPIService,
} from "../../../@providers/data/bill-invoice";

@Component({
  selector: "ngx-srv-account",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./srv-account-details.component.html",
  styleUrls: ["./srv-account-details.component.scss"],
})
export class SrvAccountDetailsComponent implements OnInit {
  @Input() service_id: string;

  routed_id$: Observable<string>;
  serviceAccount: Observable<IServiceAccountDetails>;
  billInvoices: Observable<IBillInvoiceDetails[]>;
  localDataSource: LocalDataSource = new LocalDataSource();
  tableSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      invoice_id: {
        title: "Invoice ID",
        type: "string",
        editable: false,
        // renderComponent: CustomerDetailsTableRouteComponent,
      },
      date_issued: {
        title: "Date Issued",
        type: "string",
        editable: false,
      },
      total_due_id: {
        title: "Total Due ID",
        type: "string",
        editable: false,
      },

      open_bal: {
        title: "Open Balance",
        type: "string",
        editable: false,
      },

      gross: {
        title: "Gross",
        type: "string",
        editable: false,
      },
      net: {
        title: "Net",
        type: "string",
        editable: false,
      },
      vat: {
        title: "Vat",
        type: "string",
        editable: false,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billInvoiceDetailsAPIService: IBillInvoiceDetailsAPIService,
    private serviceDetailsAPIService: IServiceAccountDetailsAPIService
  ) {}

  ngOnInit() {
    this.routed_id$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get("id"))
    );
    this.serviceAccount = this.routed_id$.pipe(
      flatMap((id) =>
        this.serviceDetailsAPIService.getServiceAccountDetailsByID(id)
      )
    );
    this.billInvoices = this.serviceAccount.pipe(
      flatMap((service_ac) =>
        this.billInvoiceDetailsAPIService.getBillInvoiceDetailsByServiceID(
          service_ac.service_id
        )
      )
    );

    this.billInvoices.subscribe((data) => {
      this.loadSearchResult(data);
    });
  }

  private loadSearchResult(searchResult: IBillInvoiceDetails[]) {
    const table_data = searchResult.map((billInvoice) => {
      return {
        invoice_id: billInvoice.invoice_id,
        date_issued: billInvoice.date_issued,
        total_due_id: billInvoice.total_due,
        open_balance: billInvoice.open_bal,
        gross: billInvoice.gross,
        net: billInvoice.net,
        vat: billInvoice.vat,
      };
    });
    this.localDataSource.load(table_data);
  }

  onEventClick() {
    return;
  }

  onClickBack() {
    this.router.navigate(["../", {}], { relativeTo: this.route });
  }

  onClickHome() {
    this.router.navigate(["/pages/landing", {}], { relativeTo: this.route });
  }
}
