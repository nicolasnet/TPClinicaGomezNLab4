import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { Router } from '@angular/router';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {

  dataSource;
  displayedColumns = ['especialidad', 'dia', 'medico', 'estado'];
  // expandedElement: Turno | null;
  listaTurnos: Turno[];
  email: string;
  usuario: any;

  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router,private usuarioService: UsuariosFirebaseService) {
    this.turnosFireServ.obtenerTurnosDisponibles().subscribe(listado =>{        
      this.listaTurnos=listado;
      this.dataSource = new MatTableDataSource(this.listaTurnos);
    });
    this.email = localStorage.getItem('usuario');
    this.obtenerUsuarioLogueado();
    
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async PedirTurno(turno: Turno){
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    console.log(turno);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: "ocupado", paciente: this.usuario} )
    this.router.navigate(['misturnos']);

  }

  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

}
