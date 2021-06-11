import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Turno } from 'src/app/clases/turno';
import { HistoriaClinicaFirebaseService } from 'src/app/services/historia-clinica-firebase.service';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-mis-turnos-especialistas',
  templateUrl: './mis-turnos-especialistas.component.html',
  styleUrls: ['./mis-turnos-especialistas.component.css']
})
export class MisTurnosEspecialistasComponent implements OnInit {
  
  listaTurnos;
  email: string;
  usuario: any;
  listadoFinal = new Array<any>();
  dataSource;
  displayedColumns = ['especialidad', 'dia', 'paciente', 'estado', 'acciones'];
  mostrarComentario: boolean;
  historiaClinica: boolean = false;
  public forma: FormGroup;
  turnoHistoriaClinica: Turno;
  
  
  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router, private usuarioService: UsuariosFirebaseService, private fb: FormBuilder, private historiaClinicaServ: HistoriaClinicaFirebaseService) {
    this.email = localStorage.getItem('usuario');
    this.obtenerTurnosDelEspecialista();
    this.obtenerUsuarioLogueado();
    console.log(this.listaTurnos);
   }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'altura': ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      'peso': ['', Validators.required],
      'temperatura': ['', Validators.required],
      'presion': ['', Validators.required],
      'otrosDatos': ['', Validators.required],
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

  async obtenerTurnosDelEspecialista(){
    await this.turnosFireServ.obtenerTurnosEspecialistas(this.email);
    this.listaTurnos = this.turnosFireServ.turnoSeleccionado;
    for (let index = 0; index < this.listaTurnos.length; index++) {
      const element = this.listaTurnos[index].data();
      if(element.estado != "disponible"){
        this.listadoFinal.push(element);
      }
    }
    this.dataSource = this.listadoFinal;
    console.log(this.listadoFinal);
  }


  async CambiarEstado(turno: Turno, estado: string){
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    console.log(turno);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {estado: estado})
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
    }    
  }
  

  async NuevaHistoriaClinica(){
    const historiaClinicaNueva = new HistoriaClinica;    
    historiaClinicaNueva.altura = this.forma.get('altura').value;
    historiaClinicaNueva.peso = this.forma.get('peso').value;
    historiaClinicaNueva.temperatura = this.forma.get('temperatura').value;
    historiaClinicaNueva.presion = this.forma.get('presion').value;
    historiaClinicaNueva.otrosDatos = this.forma.get('otrosDatos').value;
    historiaClinicaNueva.turno = this.turnoHistoriaClinica;
    historiaClinicaNueva.emailPaciente = this.turnoHistoriaClinica.paciente.email;
    this.historiaClinicaServ.create(historiaClinicaNueva);
    this.historiaClinica = false;
  }

  async Calificar(turno: Turno, texto: HTMLInputElement){
    console.log(texto.value + " "+ turno)
    await this.turnosFireServ.obtenerTurnoPorId(turno.id);
    this.turnosFireServ.update(this.turnosFireServ.idTurnoSeleccionado, {comentarioMedico: texto.value} )
    this.mostrarComentario = false;
  }



}
