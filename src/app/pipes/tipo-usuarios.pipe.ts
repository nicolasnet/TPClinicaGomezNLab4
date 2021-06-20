import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../clases/user';

@Pipe({
  name: 'tipoUsuarios'
})
export class TipoUsuariosPipe implements PipeTransform {

  transform(usuario: User, ...args: unknown[]): unknown {
    switch(usuario.role){
      case "paciente":
        return "Paciente";
      case "especialista":
        if(usuario.verificacionEspec){
          return "Especialista AUTORIZADO";
        }else{
          return "Especialista DESHABILITADO";
        }        
      case "admin":
        return "ADMINISTRADOR"
    }
    
  }

}
