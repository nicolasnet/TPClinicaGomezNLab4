import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';

@Component({
  selector: 'app-turnos-tomados',
  templateUrl: './turnos-tomados.component.html',
  styleUrls: ['./turnos-tomados.component.css']
})
export class TurnosTomadosComponent implements OnInit, AfterViewInit {

  displayedColumns = ['especialidad', 'dia', 'medico', 'estado', 'acciones'];
  public dataSource: MatTableDataSource<any>
  listaTurnos;
  listadoTurnos: Array<Turno>;
  listadoFinal = Array<Turno>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mostrarCalificacion: boolean;
  mostrarComentario: boolean;
  encuesta: boolean;

  constructor(private fb: FormBuilder, private turnosFireServ: TurnosFirebaseService) {
    
    this.turnosFireServ.obtenerTurnosConPaciente().subscribe(listado =>{        
      this.listadoTurnos=listado;
      this.listadoFinal = this.listadoTurnos;
      
      this.dataSource = new MatTableDataSource(this.listadoFinal);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   }

   ngAfterViewInit() {
    
  }
  

   ngOnInit(): void {
   
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async CancelarTurno(turno: Turno){
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    // console.log(turno);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: "disponible", paciente: ""} )
  }

  Muestra(muestra: string, turno?: Turno){
    switch(muestra){
      case "calificacion":
        this.mostrarCalificacion = !this.mostrarCalificacion;
        break;
      case "comentario":
        this.mostrarComentario = !this.mostrarComentario;
        break;
      
    }    
  }

}
