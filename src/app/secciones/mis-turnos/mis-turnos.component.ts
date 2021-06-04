import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { TurnosDatePipe } from 'src/app/pipes/turnos-date.pipe';
import { Router } from '@angular/router';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';


@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})
export class MisTurnosComponent implements OnInit {

  dataSource;
  displayedColumns = ['especialidad', 'dia', 'medico', 'estado'];
  // expandedElement: Turno | null;
  listaTurnos;
  email: string;
  usuario: any;
  listadoFinal = new Array<any>();

  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router, private usuarioService: UsuariosFirebaseService) {
    

    this.email = localStorage.getItem('usuario');
    this.obtenerTurnosDelPaciente();
    this.obtenerUsuarioLogueado();
    
    console.log(this.listaTurnos);
    
    
    
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

  async obtenerTurnosDelPaciente(){
    await this.turnosFireServ.obtenerTurnosPaciente(this.email);
    this.listaTurnos = this.turnosFireServ.turnoSeleccionado;
    for (let index = 0; index < this.listaTurnos.length; index++) {
      const element = this.listaTurnos[index].data();
      this.listadoFinal.push(element);
      
    }
    this.dataSource = this.listadoFinal;
    console.log(this.listadoFinal);
  }

  async CancelarTurno(turno: Turno){
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    console.log(turno);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: "cancelado", paciente: ""} )
    this.router.navigate(['miperfil']);

  }

}
