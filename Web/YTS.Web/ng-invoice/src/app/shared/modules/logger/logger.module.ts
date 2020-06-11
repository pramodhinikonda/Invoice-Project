import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleLoggerService } from './console-logger.service';
import { LoggerService } from './logger.service';

@NgModule({
    imports: [CommonModule],
    providers: [{ provide: LoggerService, useClass: ConsoleLoggerService }]
})
export class LoggerModule { }
