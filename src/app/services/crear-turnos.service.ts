import { Injectable } from '@angular/core';
import { couldStartTrivia } from 'typescript';
import { MisHorarios } from '../clases/mis-horarios';
import { Turno } from '../clases/turno';
import { TurnosFirebaseService } from './turnos-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CrearTurnosService {

  constructor(private turnosFireServ: TurnosFirebaseService) { }


  creaTurno(misHorarios: MisHorarios){
    // console.log("entra en crear turno 1")
    let now = new Date();
    // now.setDate(now.getDate() + 1);

    for (let index = 1; index <= 30; index++) {
      now.setDate(now.getDate() + 1);
      for (let index = 0; index < misHorarios.dias.length; index++) {
        const diaLaboral = misHorarios.dias[index];
        // console.log("valor de NOW: "+now);
        // console.log("entra en crear turno 2 "+index)
        // console.log("dia: "+(diaLaboral.id+1))
        // console.log("dia NOW: "+now.getDay())
        if(now.getDay() == (diaLaboral.id+1)){
          // console.log("entra en crear turno 3!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          let nuevoDia = now;
          for (let index = misHorarios.horarioInicial; index <= misHorarios.horarioFinal-1; index++) {
            // console.log("entra en crear turno 4??????????????????????????????");
            nuevoDia.setHours(index, 0, 0);
            let turnoNuevo: Turno = new Turno();
            turnoNuevo.dia = nuevoDia;
            turnoNuevo.especialidad=misHorarios.especialidad;
            turnoNuevo.medico=misHorarios.usuario;
            turnoNuevo.estado = "disponible";
            turnoNuevo.id = nuevoDia+misHorarios.usuario.email;
            this.turnosFireServ.create(turnoNuevo);
            if(misHorarios.duracion==30){
              let dato = nuevoDia;
              dato.setHours(index, 30);
              turnoNuevo.dia = dato;
              turnoNuevo.id = dato+misHorarios.usuario.email;
              this.turnosFireServ.create(turnoNuevo);
            }      
          }
        }
      }
    }
  }


}
