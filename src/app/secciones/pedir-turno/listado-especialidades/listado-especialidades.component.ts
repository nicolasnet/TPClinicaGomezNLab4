import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  mostrar: boolean = true;

  constructor(private especialidadesServ: EspecialidadesFireService) {
    this.especialidadesServ.getAll().subscribe(listado =>{        
      this.listaEspecialidades=listado;
    });
   }

  ngOnInit(): void {
  }

  EnviarEspecialidad(especialidadElegida: Especialidad){
    this.eventEspecialidadSeleccionada.emit(especialidadElegida);
    this.mostrar = false;
    
  }

  Mostrar(){
    this.mostrar = true;
  }

}
