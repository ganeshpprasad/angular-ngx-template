import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { ServerHTTPResponse } from "../../@core/data/http-response";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import {
  ICustomerDetails,
  ICustomerDetailsAPIService,
  ICustomerDetailsListResponse,
  ICustomerDetailsResponse,
} from "../data/customer-details";

@Injectable()
export class CustomerDetailsService extends ICustomerDetailsAPIService {
  private _url = environment.baseUrl + "/v1/crm_customer";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  getCustomerDetailsByID(id: string): Observable<ICustomerDetails> {
    const details_url: string = this._url + "/" + id;
    return this.http
      .get<ServerHTTPResponse<ICustomerDetailsResponse>>(details_url)
      .pipe(map((r) => r.result.customer));
  }

  searchCustomer(query: string): Observable<ICustomerDetails[]> {
    const details_url: string = this._url + "?query=" + query;
    return this.http
      .get<ServerHTTPResponse<ICustomerDetailsListResponse>>(details_url)
      .pipe(map((r) => r.result.customers));
  }
}
