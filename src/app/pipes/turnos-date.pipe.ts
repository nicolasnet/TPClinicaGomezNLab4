import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'turnosDate'
})
export class TurnosDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
       
    return value;

  }

}
