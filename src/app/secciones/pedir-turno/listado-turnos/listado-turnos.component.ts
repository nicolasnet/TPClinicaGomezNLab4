import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { User } from 'src/app/clases/user';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {

  @Input() especialidadParaFiltrar: Especialidad
  @Input() medicoParaFiltrar: User
  listaTurnos: any;
  listaTurnosPorEspecialidad: Array<Turno>;
  listaTurnosPorMedico: Array<Turno>;
  medicos: boolean;

  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router) {
    this.turnosFireServ.obtenerTurnosDisponibles().subscribe(listado =>{        
      this.listaTurnos=listado;
    });
   }

  ngOnInit(): void {
  }


  VerificarMedico(){
    if(this.medicoParaFiltrar){   
      this.listaTurnosPorMedico = new Array<Turno>();
      this.medicos = true;
      for (let index = 0; index < this.listaTurnosPorEspecialidad.length; index++) {
        if(this.listaTurnosPorEspecialidad[index].medico.email == this.medicoParaFiltrar.email){
          this.listaTurnosPorMedico.push(this.listaTurnosPorEspecialidad[index]);
        }        
      }
      console.log("filtro por medico: "+this.listaTurnosPorEspecialidad)
      return true;
    }  
    
  }


  VerificarEspecialidad(){
    if(this.especialidadParaFiltrar){
      this.listaTurnosPorEspecialidad = new Array<Turno>();
      this.medicos = false;
      for (let index = 0; index < this.listaTurnos.length; index++) {
         if(this.listaTurnos[index].especialidad == this.especialidadParaFiltrar.nombre){
           this.listaTurnosPorEspecialidad.push(this.listaTurnos[index]);
         }
        
      }
      return true;
    }
  }

  PedirTurno(turnoElegido: Turno){
    console.log(turnoElegido)

  }

}
