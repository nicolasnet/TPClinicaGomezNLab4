import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Turno } from 'src/app/clases/turno';
import { HistoriaClinicaFirebaseService } from 'src/app/services/historia-clinica-firebase.service';
import { PDFCreatorService } from 'src/app/services/pdfcreator.service';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { User } from 'src/app/clases/user'

@Component({
  selector: 'app-mis-turnos-especialistas',
  templateUrl: './mis-turnos-especialistas.component.html',
  styleUrls: ['./mis-turnos-especialistas.component.css']
})
export class MisTurnosEspecialistasComponent implements OnInit, OnChanges {
  
  listaTurnos;
  email: string;
  usuario: any;
  listadoFinal = new Array<any>();
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['especialidad', 'dia', 'paciente', 'estado', 'acciones'];
  mostrarComentario = false;
  historiaClinica: boolean = false;
  public forma: FormGroup;
  turnoHistoriaClinica: Turno;
  listadoHistoriaClinica = new Array<any>();
  listadoHistoriaClinicaFinal = new Array<any>();
  pacienteElegido;
  pacienteSeleccionado: User;
  
  
  
  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router, private usuarioService: UsuariosFirebaseService, private fb: FormBuilder, private historiaClinicaServ: HistoriaClinicaFirebaseService, private pdfServ: PDFCreatorService) {

    this.email = localStorage.getItem('usuario');
    this.turnosFireServ.obtenerTurnosConPaciente().subscribe(listado =>{        
      this.listaTurnos=listado;
      this.listadoFinal = new Array<any>();
      for (let index = 0; index < this.listaTurnos.length; index++) {
        if(this.listaTurnos[index].medico.email == this.email){
          this.listadoFinal.push(this.listaTurnos[index]);
          //console.log(Object.keys(this.listadoTurnos[index].medico)[0]+" // "+Object.values(this.listadoTurnos[index].medico)[0]);
           
        }        
      }
      this.dataSource = new MatTableDataSource(this.listadoFinal);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   }
  ngOnChanges() {
    // this.email = localStorage.getItem('usuario');
    // this.listadoFinal = new Array<any>();
    // this.turnosFireServ.obtenerTurnosConPaciente().subscribe(listado =>{        
    //   this.listaTurnos=listado;
    //   for (let index = 0; index < this.listaTurnos.length; index++) {
    //     if(this.listaTurnos[index].medico.email == this.email){
    //       this.listadoFinal.push(this.listaTurnos[index]);
    //       //console.log(Object.keys(this.listadoTurnos[index].medico)[0]+" // "+Object.values(this.listadoTurnos[index].medico)[0]);
           
    //     }        
    //   }
    //   this.dataSource = new MatTableDataSource(this.listadoFinal);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'altura': ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      'peso': ['', Validators.required],
      'temperatura': ['', Validators.required],
      'presion': ['', Validators.required],
      'clave1': [],
      'clave2': [],
      'clave3': [],
      'valor1': [],
      'valor2': [],
      'valor3': [],
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("entro en filtro funcion: " + filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

  // async obtenerTurnosDelEspecialista(){
  //   await this.turnosFireServ.obtenerTurnosEspecialistas(this.email);
  //   this.listaTurnos = this.turnosFireServ.turnoSeleccionado;
  //   for (let index = 0; index < this.listaTurnos.length; index++) {
  //     const element = this.listaTurnos[index].data();
  //     if(element.estado != "disponible"){
  //       this.listadoFinal.push(element);
  //     }
  //   }
  //   this.dataSource = this.listadoFinal;
  //   console.log(this.listadoFinal);
  // }


  async CambiarEstado(turno: Turno, estado: string){
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    console.log(turno);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: estado});
    
  }

  

  Muestra(muestra: string, turno: Turno){
    switch(muestra){
      case "historiaClinica":
        this.historiaClinica = !this.historiaClinica;
        this.turnoHistoriaClinica = turno;
        break;
      case "comentario":
        this.mostrarComentario = !this.mostrarComentario;
        break;
      case "pacienteElegido":
        this.pacienteElegido = !this.pacienteElegido;
        break;
    }    
  }
  

  async NuevaHistoriaClinica(){
    const historiaClinicaNueva = new HistoriaClinica;    
    historiaClinicaNueva.altura = this.forma.get('altura').value;
    historiaClinicaNueva.peso = this.forma.get('peso').value;
    historiaClinicaNueva.temperatura = this.forma.get('temperatura').value;
    historiaClinicaNueva.presion = this.forma.get('presion').value;
    historiaClinicaNueva.emailPaciente = this.turnoHistoriaClinica.paciente.email;
    historiaClinicaNueva.clave1 = this.forma.get('clave1').value;
    historiaClinicaNueva.clave2 = this.forma.get('clave2').value;
    historiaClinicaNueva.clave3 = this.forma.get('clave3').value;
    historiaClinicaNueva.valor1 = this.forma.get('valor1').value;
    historiaClinicaNueva.valor2 = this.forma.get('valor2').value;
    historiaClinicaNueva.valor3 = this.forma.get('valor3').value;

    await this.turnosFireServ.obtenerTurnoPorId(this.turnoHistoriaClinica.id);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {historiaClinica: Object.assign({}, historiaClinicaNueva)});
    historiaClinicaNueva.turno = this.turnoHistoriaClinica;    
    this.historiaClinicaServ.create(historiaClinicaNueva);
    this.historiaClinica = false;
  }

  async Calificar(turno: Turno, texto: HTMLInputElement){
    console.log(texto.value + " "+ turno)
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {comentarioMedico: texto.value} )
    this.mostrarComentario = false;
  }

  ElegirPaciente(turno: Turno){
    this.obtenerHistoriaClinicaDelPaciente(turno.paciente.email);
    this.pacienteSeleccionado = turno.paciente;
    this.pacienteElegido = true;
  }

  async obtenerHistoriaClinicaDelPaciente(email: string){
    await this.historiaClinicaServ.obtenerHistoriaClinicaConEmailPaciente(email);
    this.listadoHistoriaClinica = this.historiaClinicaServ.hisotriaClinicaSeleccionada;
    for (let index = 0; index < this.listadoHistoriaClinica.length; index++) {
      const element = this.listadoHistoriaClinica[index].data();
      this.listadoHistoriaClinicaFinal.push(element);      
    }
  }

  ImprimirPDF(){    
    this.pdfServ.PDFdownloadByHTMLid('historiaClinica', 'HistoriaClinica'+'_'+this.pacienteSeleccionado.apellido+" "+this.pacienteSeleccionado.nombre);
    // this.pdfServ.paginado();
  }



}
