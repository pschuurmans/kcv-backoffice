import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const seconds = value.seconds * 1000; // Convert timestamp to date
      return new Date(seconds).toLocaleString('nl-NL');
    }
  }

}
