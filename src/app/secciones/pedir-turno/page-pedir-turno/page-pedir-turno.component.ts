import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-page-pedir-turno',
  templateUrl: './page-pedir-turno.component.html',
  styleUrls: ['./page-pedir-turno.component.css']
})
export class PagePedirTurnoComponent implements OnInit {

  especialidadSeleccionada: Especialidad;
  medicoSeleccionado: User;
  mostrar: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  CargarEspecialidadSeleccionado(especialidad: Especialidad){
    this.especialidadSeleccionada = especialidad;
    console.log(especialidad);
  }

  CargarMedicoSeleccionado(usuario: User){
    this.medicoSeleccionado = usuario;
    // console.log("entra en funcion de page form: "+usuario);
  }

  NoMostrarMedicos(boolean: boolean){
    this.mostrar = boolean;
  }

}
