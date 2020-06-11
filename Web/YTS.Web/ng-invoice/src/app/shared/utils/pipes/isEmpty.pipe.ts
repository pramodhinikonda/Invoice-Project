import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isEmpty' })
export class IsEmptyPipe implements PipeTransform {
  transform(value: string, fallback: string): string {
    let processedValue = '';
    if (value) {
      processedValue = value;
    } else {
      processedValue = fallback;
    }
    return processedValue;
  }
}
