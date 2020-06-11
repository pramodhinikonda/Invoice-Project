import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IUnit, Unit } from '../services/unit.model';

@Injectable()
export class UnitService {
  private readonly serviceName: string = 'Unit';
  private baseURL: string;

  constructor(private http: HttpClient) { this.baseURL = environment.apiEndpoint + this.serviceName + '/'; }

  getUnits(): Observable<Array<IUnit>> {
    return this.http.get<Array<IUnit>>(this.baseURL + 'GetUnits');
  }

  save(unit: Unit): Observable<IUnit> {
    return this.http.post<IUnit>(this.baseURL + 'Save', unit);
  }

  delete(unitID: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + 'Delete?unitID=' + unitID);
  }
}
