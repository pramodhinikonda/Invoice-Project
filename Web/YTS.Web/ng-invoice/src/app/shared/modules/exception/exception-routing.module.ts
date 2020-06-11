import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExceptionHandlerComponent } from './components/exception-handler/exception-handler.component';

const routes: Routes = [
    { path: 'exception', component: ExceptionHandlerComponent },
    { path: 'unauthorized', component: ExceptionHandlerComponent, data: { error: 401 } },
    { path: '**', component: ExceptionHandlerComponent, data: { error: 404 } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExceptionRoutingModule { }
