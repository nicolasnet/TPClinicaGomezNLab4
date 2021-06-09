import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-page-pedir-turno',
  templateUrl: './page-pedir-turno.component.html',
  styleUrls: ['./page-pedir-turno.component.css']
})
export class PagePedirTurnoComponent implements OnInit {

  especialidadSeleccionada: Especialidad;

  constructor() { }

  ngOnInit(): void {
  }

  CargarEspecialidadSeleccionado(especialidad: Especialidad){
    this.especialidadSeleccionada = especialidad;
    console.log(especialidad);
  }

}
