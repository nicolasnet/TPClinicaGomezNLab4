import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadesFireService } from 'src/app/services/especialidades-fire.service';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.css']
})
export class ListadoEspecialidadesComponent implements OnInit {

  listaEspecialidades: any[];
  @Output() eventEspecialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventNoMostrarMedicos: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean = true;

  constructor(private especialidadesServ: EspecialidadesFireService, private router: Router) {
    this.especialidadesServ.getAll().subscribe(listado =>{        
      this.listaEspecialidades=listado;
    });
   }

  ngOnInit(): void {
  }

  EnviarEspecialidad(especialidadElegida: Especialidad){
    this.eventEspecialidadSeleccionada.emit(especialidadElegida);
    this.eventNoMostrarMedicos.emit(false);

    this.mostrar = false;
    
  }

  Mostrar(){
    this.mostrar = true;
    this.eventEspecialidadSeleccionada.emit("");
    this.eventNoMostrarMedicos.emit(false);
  }

}
