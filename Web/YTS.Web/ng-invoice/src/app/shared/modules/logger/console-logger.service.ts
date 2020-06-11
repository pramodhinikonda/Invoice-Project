import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Logger } from './logger.service';

export let isDebugMode = environment.production;

const noop = (): any => undefined;

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService implements Logger {

  get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    return console.warn.bind(console);
  }

  get error() {
    return console.error.bind(console);
  }

  invokeConsoleMethod(type: string, args?: any): void {
    const logFn: Function = (console)[type] || console.info || noop;
    logFn.apply(console, [args]);
  }
}
