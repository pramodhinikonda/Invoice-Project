import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsEmptyPipe } from './isEmpty.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IsEmptyPipe
  ],
  exports: [IsEmptyPipe]
})
export class PipeModule { }
