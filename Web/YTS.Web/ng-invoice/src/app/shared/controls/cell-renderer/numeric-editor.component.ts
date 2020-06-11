import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: 'app-numeric-editor-cell',
  template: `
    <input #i [value]="params.value" class="width-100" (keypress)="onKeyPress($event)" (keydown)="onKeyDown($event)"/>
  `
})
export class NumericEditorComponent implements AfterViewInit {
  @ViewChild('i') textInput;
  params;

  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  agInit(params: any): void {
    this.params = params;
  }

  getValue() {
    return this.textInput.nativeElement.value;
  }

  onKeyPress(event) {
    if (!isNumeric(event)) {
      event.preventDefault();
    }

    function isNumeric(ev) {
      return /\d/.test(ev.key);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }
}
