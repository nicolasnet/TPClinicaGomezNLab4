import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { TurnosDatePipe } from 'src/app/pipes/turnos-date.pipe';
import { Router } from '@angular/router';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestaFirebaseService } from 'src/app/services/encuesta-firebase.service';


@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MisTurnosComponent implements OnInit, AfterViewInit {

  
  displayedColumns = ['especialidad', 'dia', 'medico', 'estado', 'acciones'];
  public dataSource: MatTableDataSource<any>
  expandedElement: Turno | null;
  listaTurnos;
  email: string;
  usuario: any;
  listadoTurnos: Array<Turno>;
  listadoFinal = Array<Turno>();
  mostrarCalificacion: boolean = false;
  mostrarComentario: boolean = false;
  encuesta: boolean = false;
  public forma: FormGroup;
  nuevaEncuesta: Encuesta;
  turnoEncuesta: Turno;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private turnosFireServ: TurnosFirebaseService, private router: Router, private usuarioService: UsuariosFirebaseService, private encuestaServ: EncuestaFirebaseService) {
    this.email = localStorage.getItem('usuario');
    this.turnosFireServ.obtenerTurnosConPaciente().subscribe(listado =>{        
      this.listadoTurnos=listado;
      for (let index = 0; index < this.listadoTurnos.length; index++) {
        if(this.listadoTurnos[index].paciente.email == this.email){
          this.listadoFinal.push(this.listadoTurnos[index]);
        }        
      }
      this.dataSource = new MatTableDataSource(this.listadoFinal);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   }

   ngAfterViewInit() {
    
  }

   ngOnInit(): void {
    this.forma = this.fb.group({
      'puntaje': ['', Validators.required],
      'favorito': ['', Validators.required],
      'opinion': ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

  // async obtenerTurnosDelPaciente(){
  //   await this.turnosFireServ.obtenerTurnosPaciente(this.email);
  //   this.listaTurnos = this.turnosFireServ.turnoSeleccionado;
  //   for (let index = 0; index < this.listaTurnos.length; index++) {
  //     const element = this.listaTurnos[index].data();
  //     this.listadoFinal.push(element);
      
  //   }
  //   this.dataSource = this.listadoFinal;
  //   console.log(this.listadoFinal);
  // }

  async CancelarTurno(turno: Turno){
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    console.log(turno);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: "disponible", paciente: ""} )
    this.router.navigate(['miperfil']);

  }

  Muestra(muestra: string, turno?: Turno){
    switch(muestra){
      case "calificacion":
        this.mostrarCalificacion = !this.mostrarCalificacion;
        break;
      case "comentario":
        this.mostrarComentario = !this.mostrarComentario;
        break;
      case "encuesta":
        this.encuesta = !this.encuesta;
        this.turnoEncuesta = turno;
        break;
    }
    
  }

  async Calificar(turno: Turno, texto: HTMLInputElement){
    console.log(texto.value + " "+ turno)
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {calificacion: texto.value} )
    this.mostrarCalificacion = false;
  }


  async NuevaEncuesta(){
    const encuestaNueva = new Encuesta;
    
    encuestaNueva.puntaje = this.forma.get('puntaje').value;
    encuestaNueva.opinion = this.forma.get('opinion').value;
    encuestaNueva.favorito = this.forma.get('favorito').value;
    await this.turnosFireServ.obtenerTurnoPorId(this.turnoEncuesta.id);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {encuesta: Object.assign({}, encuestaNueva)} )
    encuestaNueva.turno = this.turnoEncuesta;
    this.encuestaServ.create(encuestaNueva);
    this.encuesta = false;
  }

}
