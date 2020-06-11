import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from './directives/datatable.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DataTableDirective],
  exports: [DataTableDirective]
})
export class DataTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DataTableModule
    };
  }
}
