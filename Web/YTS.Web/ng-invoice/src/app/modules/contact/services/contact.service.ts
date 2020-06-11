import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IContact, Contact } from '../services/contact.model';

@Injectable()
export class ContactService {
  private readonly serviceName: string = 'Contact';
  private baseURL: string;

  constructor(private http: HttpClient) { this.baseURL = environment.apiEndpoint + this.serviceName + '/'; }

  getContacts(): Observable<Array<IContact>> {
    return this.http.get<Array<IContact>>(this.baseURL + 'GetContacts');
  }

  save(contact: Contact): Observable<IContact> {
    return this.http.post<IContact>(this.baseURL + 'Save', contact);
  }

  delete(contactID: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + 'Delete?contactID=' + contactID);
  }
}
