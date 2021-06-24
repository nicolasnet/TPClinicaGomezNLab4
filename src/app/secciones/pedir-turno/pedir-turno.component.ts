import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { Router } from '@angular/router';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { User } from 'src/app/clases/user';

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
  listaUsuarios: any[];
  turnoElegido: Turno;

  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router,private usuarioService: UsuariosFirebaseService) {
    this.turnosFireServ.obtenerTurnosDisponibles().subscribe(listado =>{        
      this.listaTurnos=listado;
      this.dataSource = new MatTableDataSource(this.listaTurnos);
    }); 

    this.usuarioService.getAllPacientes().subscribe(listado =>{
      this.listaUsuarios=listado;     
    });
    
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  PedirTurno(turno: Turno){
    (<HTMLInputElement>document.getElementById("listaPacientes")).hidden = false;
    (<HTMLInputElement>document.getElementById("listaTurnos")).hidden = true;
    this.turnoElegido = turno;
  }

  async AsigarTurno(usuario: User){
    await this.turnosFireServ.obtenerTurnoPorId(this.turnoElegido.id);
    console.log(this.turnoElegido);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: "ocupado", paciente: usuario})
    this.router.navigate(['']);
  }


}
