import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';

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
  listaTurnos: Turno[];

  constructor(private turnosFireServ: TurnosFirebaseService) {
    this.turnosFireServ.getAll().subscribe(listado =>{        
      this.listaTurnos=listado;
      this.dataSource = new MatTableDataSource(this.listaTurnos);
    });
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
