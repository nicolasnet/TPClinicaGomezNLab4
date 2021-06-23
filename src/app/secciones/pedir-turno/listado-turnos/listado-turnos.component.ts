import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { User } from 'src/app/clases/user';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit, OnChanges {

  @Input() especialidadParaFiltrar: Especialidad
  @Input() medicoParaFiltrar: User
  @Input() mostrar: boolean
  listaTurnos: any;
  listaTurnosPorEspecialidad: Array<Turno>;
  listaTurnosPorMedico: Array<Turno>;
  medicos: boolean = false;
  email: string;
  usuario: any;

  constructor(private turnosFireServ: TurnosFirebaseService, private router: Router,private usuarioService: UsuariosFirebaseService) {
    this.turnosFireServ.obtenerTurnosDisponibles().subscribe(listado =>{        
      this.listaTurnos=listado;
    });
    this.email = localStorage.getItem('usuario');
    this.obtenerUsuarioLogueado();
   }

  ngOnInit(): void {
    
  }

  ngOnChanges(){
 
  }


  VerificarMedico(){
    if(this.medicoParaFiltrar){
      // this.ngOnChanges()
      this.listaTurnosPorMedico = new Array<Turno>();
      this.medicos = true;
      for (let index = 0; index < this.listaTurnosPorEspecialidad.length; index++) {
        if(this.listaTurnosPorEspecialidad[index].medico.email == this.medicoParaFiltrar.email){
          this.listaTurnosPorMedico.push(this.listaTurnosPorEspecialidad[index]);
        }        
      }
      // console.log("filtro por medico: "+this.listaTurnosPorEspecialidad)
      return true;
    }  
    
  }


  VerificarEspecialidad(){
    if(this.especialidadParaFiltrar){
      this.listaTurnosPorEspecialidad = new Array<Turno>();
      this.medicos = false;
      for (let index = 0; index < this.listaTurnos.length; index++) {
        
         if(this.listaTurnos[index].especialidad == this.especialidadParaFiltrar.nombre){
           this.listaTurnosPorEspecialidad.push(this.listaTurnos[index]);
         }
        
      }
      return true;
    }
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
