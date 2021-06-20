import { Pipe, PipeTransform } from '@angular/core';
import { Estado } from '../clases/turno';

@Pipe({
  name: 'estadoTurnos'
})
export class EstadoTurnosPipe implements PipeTransform {

  transform(value: Estado, ...args: unknown[]): unknown {
    switch(value){
      case "ocupado":
        return "Esperando aprobacion";
      case "finalizado":
        return "Finalizado"
        
      case "aceptado":
        return "Aceptado"
    }
  }
}
