import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { AuthInterceptor, ErrorInterceptor } from '../../interceptors';
import { AppRoutingModule } from './app-routing.module';
import { PipeModule } from '../../utils/pipes/pipe.module';
import { ExceptionModule } from '../../modules/exception/exception.module';
import { LoggerModule } from '../../modules/logger/logger.module';
import { AuthenticationService } from './services/authentication.service';
import { ProfileService } from './services/profile.service';
import { AppComponent } from './components/content/app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FooterComponent } from './components/footer/footer.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                SideNavComponent,
                TopNavComponent,
                FooterComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                PipeModule,
                RouterModule,
                NgProgressModule.withConfig({ speed: 300, thick: true, color: '#1ab394' }),
                ExceptionModule,
                LoggerModule,
                NgSelectModule,
                NgOptionHighlightModule
            ],
            providers: [AuthenticationService, ProfileService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map