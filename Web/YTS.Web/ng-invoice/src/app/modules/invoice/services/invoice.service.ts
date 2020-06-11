import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IInvoice } from '../services/invoice.model';

@Injectable()
export class InvoiceService {
  private readonly serviceName: string = 'Invoice';
  private baseURL: string;

  constructor(private http: HttpClient) { this.baseURL = environment.apiEndpoint + this.serviceName + '/'; }

}
