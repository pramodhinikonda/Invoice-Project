import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { IUser, IOrganization } from '../../../models/auth.model';

@Injectable()
export class ProfileService {

  private readonly userServiceName: string = 'User';
  private userBaseURL: string;

  private readonly orgServiceName: string = 'Organization';
  private orgBaseURL: string;

  constructor(private http: HttpClient) {
    this.userBaseURL = environment.apiEndpoint + this.userServiceName + '/';
    this.orgBaseURL = environment.apiEndpoint + this.orgServiceName + '/';
  }

  getByEmail(email: string): Observable<IUser> {
    return this.http.get<IUser>(this.userBaseURL + 'GetByEmail?email=' + email);
  }

  getOrganizations(userID: string): Observable<Array<IOrganization>> {
    return this.http.get<Array<IOrganization>>(this.orgBaseURL + 'GetOrganizations?userID=' + userID);
  }
}
