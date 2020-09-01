import {LocalDataSource} from 'ng2-smart-table';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {
    IServiceAccountDetails,
    IServiceAccountDetailsAPIService,
} from '../../../@providers/data/service-account';
import {
    IBillInvoiceDetails,
    IBillInvoiceDetailsAPIService,
} from '../../../@providers/data/bill-invoice';
import {IBillTransaction, IBillTransactionAPIService} from '../../../@providers/data/bill-transaction';

@Component({
    selector: 'ngx-srv-account',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './srv-account-details.component.html',
    styleUrls: ['./srv-account-details.component.scss'],
})
export class SrvAccountDetailsComponent implements OnInit {
    @Input() service_id: string;

    routed_id$: Observable<string>;
    serviceAccount$: Observable<IServiceAccountDetails>;
    billInvoices$: Observable<IBillInvoiceDetails[]>;
    billTransactions$: Observable<IBillTransaction[]>;
    localDataSource: LocalDataSource = new LocalDataSource();
    tableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            invoice_id: {
                title: 'Invoice ID',
                type: 'string',
                editable: false,
                // renderComponent: CustomerDetailsTableRouteComponent,
            },
            date_issued: {
                title: 'Date Issued',
                type: 'string',
                editable: false,
            },
            total_due_id: {
                title: 'Total Due ID',
                type: 'string',
                editable: false,
            },

            open_bal: {
                title: 'Open Balance',
                type: 'string',
                editable: false,
            },

            gross: {
                title: 'Gross',
                type: 'string',
                editable: false,
            },
            net: {
                title: 'Net',
                type: 'string',
                editable: false,
            },
            vat: {
                title: 'Vat',
                type: 'string',
                editable: false,
            },
        },
    };
    billTransactionDataSource: LocalDataSource = new LocalDataSource();
    billTransactionstableSettings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            invoice_id: {
                title: 'Invoice ID',
                type: 'string',
                editable: false,
            },
            bill_period_st: {
                title: 'Bill Period Start',
                type: 'string',
                editable: false,
            },
            bill_period_ed: {
                title: 'Bill Period End',
                type: 'string',
                editable: false,
            },
            tariff_code: {
                title: 'Tariff Code',
                type: 'string',
                editable: false,
            },
            vat_code: {
                title: 'VAT Code',
                type: 'string',
                editable: false,
            },
            unit_rate: {
                title: 'Unit Rate',
                type: 'string',
                editable: false,
            },
            vat_rate: {
                title: 'VAT Rate',
                type: 'string',
                editable: false,
            },
            quantity: {
                title: 'Quantity',
                type: 'string',
                editable: false,
            },
            gross: {
                title: 'Gross',
                type: 'string',
                editable: false,
            },
            net: {
                title: 'Net',
                type: 'string',
                editable: false,
            },
            vat: {
                title: 'Vat',
                type: 'string',
                editable: false,
            },
        },
    };


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private billInvoiceDetailsAPIService: IBillInvoiceDetailsAPIService,
        private serviceDetailsAPIService: IServiceAccountDetailsAPIService,
        private billTransactionAPIService: IBillTransactionAPIService,
    ) {}

    ngOnInit() {
        this.routed_id$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get('id')),
        );
        this.serviceAccount$ = this.routed_id$.pipe(
            flatMap((id) =>
                this.serviceDetailsAPIService.getServiceAccountDetailsByID(id),
            ),
        );
        this.billInvoices$ = this.serviceAccount$.pipe(
            flatMap((service_ac) =>
                this.billInvoiceDetailsAPIService.getBillInvoiceDetailsByServiceID(
                    service_ac.service_id,
                ),
            ),
        );
        this.billInvoices$.subscribe((data) => {
            this.loadBillInvoices(data);
        });
        this.billTransactions$ = this.serviceAccount$.pipe(
            flatMap((service_ac) =>
                this.billTransactionAPIService.getBillTransactionsByServiceID(
                    service_ac.service_id,
                ),
            ),
        );
        this.billTransactions$.subscribe((data) => {
            this.loadBillTransactions(data);
        });
    }

    private loadBillInvoices(details: IBillInvoiceDetails[]) {
        const table_data = details.map((billInvoice) => {
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

    private loadBillTransactions(transactions: IBillTransaction[]) {
        const table_data = transactions.map((billTransaction) => {
            return {
                invoice_id: billTransaction.invoice_id,
                service_id: billTransaction.service_id,
                quantity: billTransaction.quantity,
                bill_period_st: billTransaction.bill_period_st,
                transaction_id: billTransaction.transaction_id,
                vat_code: billTransaction.vat_code,
                description: billTransaction.description,
                vat_rate: billTransaction.vat_rate,
                gross: billTransaction.gross,
                tariff_code: billTransaction.tariff_code,
                bill_run_id: billTransaction.bill_run_id,
                vat: billTransaction.vat,
                unit_rate: billTransaction.unit_rate,
                net: billTransaction.net,
                bill_period_ed: billTransaction.bill_period_ed,
            };
        });
        this.billTransactionDataSource.load(table_data);
    }

    onEventClick() {
        return;
    }

    onClickBack() {
        this.router.navigate(['../', {}], {relativeTo: this.route});
    }

    onClickHome() {
        this.router.navigate(['/pages/landing', {}], {relativeTo: this.route});
    }
}
