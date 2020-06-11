import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { ExceptionService } from '../exception.service';

@Injectable()
export class ExceptionHandler implements ErrorHandler {
    constructor(
        private injector: Injector,
    ) { }

    handleError(error: Error) {
        const errorsService = this.injector.get(ExceptionService);
        const router = this.injector.get(Router);

        // Client Error Happend
        errorsService
            .log(error)
            .subscribe(errorWithContextInfo => {
                router.navigate(['/exception'], { queryParams: { hasError: true } });
            });
    }
}
