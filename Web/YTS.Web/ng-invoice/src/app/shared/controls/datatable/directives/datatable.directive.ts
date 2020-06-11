import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

declare var $: any;

@Directive({
  selector: '[datatable]'
})
export class DataTableDirective implements OnDestroy, OnInit {

  @Input()
  dtOptions: any = {};

  @Input()
  dtTrigger: Subject<any>;

  dtInstance: Promise<any>;

  private dt: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.dtTrigger) {
      this.dtTrigger.subscribe(() => {
        this.displayTable();
      });
    } else {
      this.displayTable();
    }
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.dt) {
      this.dt.destroy(true);
    }
  }

  private displayTable(): void {
    this.dtInstance = new Promise((resolve, reject) => {
      Promise.resolve(this.dtOptions).then(dtOptions => {
        // Using setTimeout as a "hack" to be "part" of NgZone
        setTimeout(() => {
          this.dt = $(this.el.nativeElement).DataTable(dtOptions);
          resolve(this.dt);
        });
      });
    });
  }
}
