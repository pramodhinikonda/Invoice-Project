import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ISalesPerson, SalesPerson } from '../services/salesperson.model';

@Injectable()
export class SalesPersonService {
  private readonly serviceName: string = 'SalesPerson';
  private baseURL: string;

  constructor(private http: HttpClient) { this.baseURL = environment.apiEndpoint + this.serviceName + '/'; }

  getSalesPersons(): Observable<Array<ISalesPerson>> {
    return this.http.get<Array<ISalesPerson>>(this.baseURL + 'GetSalesPersons');
  }

  save(salesperson: SalesPerson): Observable<ISalesPerson> {
    return this.http.post<ISalesPerson>(this.baseURL + 'Save', salesperson);
  }

  delete(salespersonID: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + 'Delete?salespersonID=' + salespersonID);
  }
}
