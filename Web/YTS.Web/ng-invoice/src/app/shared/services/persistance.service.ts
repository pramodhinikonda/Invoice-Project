import { Injectable, Injector } from '@angular/core';

import { LoggerService } from '../modules/logger/logger.service';

@Injectable({ providedIn: 'root' })
export class PersistanceService {

  constructor(private logger: LoggerService) { }

  // Local Storage

  set(key: string, data: any): void {
    try {
      if (this.isLocalStorageAvailable)
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      this.logger.error('Error saving to localStorage', e);
    }
  }

  get(key: string): any {
    try {
      if (this.isLocalStorageAvailable)
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      this.logger.error('Error getting data from localStorage', e);
      return null;
    }
  }

  delete(key: string): void {
    try {
      if (this.isLocalStorageAvailable)
        localStorage.removeItem(key);
    } catch (e) {
      this.logger.error('Error getting data from localStorage', e);
      return null;
    }
  }

  deleteAll(keys: string[]): void {
    try {
      if (this.isLocalStorageAvailable) {
        keys.forEach(function (key) {
          localStorage.removeItem(key);
        });
      }
    } catch (e) {
      this.logger.error('Error getting data from localStorage', e);
      return null;
    }
  }

  clear(): void {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.clear();
      }
    } catch (e) {
      this.logger.error('Error getting data from localStorage', e);
      return null;
    }
  }

  private isLocalStorageAvailable(): boolean {
    if (window.localStorage)
      return true
    else
      return false;
  }

  // Cookies
  create(cookieName: string, cookieValue: string, minsToExpire: number): void {
    var date = new Date();
    date.setTime(date.getTime() + (minsToExpire * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toUTCString();
  }
}
