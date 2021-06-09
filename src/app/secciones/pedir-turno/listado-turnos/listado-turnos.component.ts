import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {

  @Input() especialidadParaFiltrar: Especialidad
  listaTurnos: any;
  listaTurnosPorEspecialidad: Array<Turno>;

  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router) {
    this.turnosFireServ.obtenerTurnosDisponibles().subscribe(listado =>{        
      this.listaTurnos=listado;
    });
   }

  ngOnInit(): void {
  }


  Verificar(){
    if(this.especialidadParaFiltrar){
      this.listaTurnosPorEspecialidad = new Array<Turno>();
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
