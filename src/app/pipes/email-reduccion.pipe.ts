import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailReduccion'
})
export class EmailReduccionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length>20){
      let nuevoValor = value.substr(0, 7) + "...@" + value.split("@")[1];
      return nuevoValor;
    }else{
      return value;
    }
  }
}
