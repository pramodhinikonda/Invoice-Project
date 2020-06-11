import { Component } from '@angular/core';

@Component({
  selector: 'cu-download-link-cell-renderer',
  template: `
  <div class="text-center">
    <i class="fa {{params.icon}}" (click)="onClick()" aria-hidden="true"></i>
  </div>`
})
export class CellRendererComponent {
  params;
  constructor() {
  }
  agInit(params): void {
    this.params = params;
    if (!params.action) {
      throw new Error('Missing action parameter for CellRendererComponent');
    }
  }

  onClick(): void {
    this.params.action(this.params);
  }
}

export type CellAction = (params) => void;
