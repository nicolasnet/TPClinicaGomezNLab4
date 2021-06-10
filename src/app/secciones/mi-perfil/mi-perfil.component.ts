import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MisHorarios } from 'src/app/clases/mis-horarios';
import { User } from 'src/app/clases/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CrearTurnosService } from 'src/app/services/crear-turnos.service';
import { DiasLaborablesService } from 'src/app/services/dias-laborables.service';
import { FileFirestoreService, FotosUsuario_STORAGE_PATH } from 'src/app/services/file-firestore.service';
import { MisHorariosFirebaseService } from 'src/app/services/mis-horarios-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuario;
  email: string;
  img;
  public url: string;

  public forma: FormGroup;
  public listaDias;
  public listaHorarios = [8,9,10,11,12,13,14,15,16,17,18,19];
  public listaDuracion = [30,60];
  public listaEspecialidades;
  mostrar: boolean = false;
  correcto: boolean = false;

  constructor(private navegador: Router, private crearTurnosServ: CrearTurnosService ,private diasLaborablesServ: DiasLaborablesService, private usuarioService: UsuariosFirebaseService, private storageService: FileFirestoreService,private fb: FormBuilder, private router: Router, private misHorariosServ: MisHorariosFirebaseService) {
    this.listaDias = this.diasLaborablesServ.listadoDiasLaborables;
    this.email = localStorage.getItem('usuario');
    this.storageService.referenciaCloudStorage(FotosUsuario_STORAGE_PATH + this.email+"-imgPerfil.jpg")
        .getDownloadURL().pipe(take(1)).subscribe(url => {
            this.url = url;
            console.log(this.url)
        })
    this.obtenerUsuarioLogueado();

   }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'especialidad': ['', Validators.required],
      'dias': ['', Validators.required],
      'horarioInicial': ['', Validators.required],
      'horarioFinal': ['', Validators.required],
      'duracion': ['', Validators.required],
    }); 
  }


  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;
    this.listaEspecialidades = this.usuario.especialidad;   
    // console.log(this.url);
  }

  Mostrar(){
    this.mostrar = !this.mostrar;
  }

  NuevaDisponibilidad(){
    let misHorariosNuevos = new MisHorarios;
    misHorariosNuevos.especialidad = this.forma.get('especialidad').value;
    misHorariosNuevos.dias = this.forma.get('dias').value;
    misHorariosNuevos.horarioInicial = this.forma.get('horarioInicial').value;
    misHorariosNuevos.horarioFinal = this.forma.get('horarioFinal').value;
    misHorariosNuevos.duracion = this.forma.get('duracion').value;
    misHorariosNuevos.fechaCreacion = new Date;
    misHorariosNuevos.usuario = this.usuario;
    // this.misHorariosServ.create(misHorariosNuevos);
    this.crearTurnosServ.creaTurno(misHorariosNuevos);
    this.correcto = true;
  }

  Navegar(ruta: string){
    this.navegador.navigate([ruta]);
  }

}
