import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Event, NavigationError } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable()
export class ExceptionService {

    constructor(
        private injector: Injector,
        private router: Router,
    ) {
        // Subscribe to the NavigationError
        this.router
            .events
            .subscribe((event: Event) => {
                if (event instanceof NavigationError) {
                    // Redirect to the ErrorComponent
                    this.log(event.error)
                        .subscribe((errorWithContext) => {
                            this.router.navigate(['/exception'], { queryParams: errorWithContext })
                        });
                }
            });
    }

    log(error: any): Observable<any> {
        console.error(error);
        return of(error);
    }
}
