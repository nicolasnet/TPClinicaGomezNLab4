import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Especialidad } from 'src/app/clases/especialidad';
import { User } from 'src/app/clases/user';
import { FileFirestoreService, FotosUsuario_STORAGE_PATH } from 'src/app/services/file-firestore.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})
export class ListadoEspecialistasComponent implements OnInit {

  @Output() eventEspecialistaSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventMostrar: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidadParaFiltrar: Especialidad
  listaUsuarios: any[];
  listaUsuariosEspecialidadFiltrada: any[];
  imgUrl: string;
  

  constructor(private ususariosServ: UsuariosFirebaseService, private storageService: FileFirestoreService) {
    this.ususariosServ.getAll().subscribe(listado =>{        
      this.listaUsuarios=listado;
    });
   }

  ngOnInit(): void {
  }

  Verificar(){
    if(this.especialidadParaFiltrar){
      // console.log("entro en verificar ususarios")
      this.listaUsuariosEspecialidadFiltrada = new Array<User>();
      for (let index = 0; index < this.listaUsuarios.length; index++) {
        if(this.listaUsuarios[index].especialidad){
          for (let i = 0; i < this.listaUsuarios[index].especialidad.length; i++) {
            const element = this.listaUsuarios[index].especialidad[i];
            if(this.listaUsuarios[index].especialidad[i].nombre == this.especialidadParaFiltrar.nombre){
              this.listaUsuariosEspecialidadFiltrada.push(this.listaUsuarios[index]);              
            }
          }
        }        
      }      
      return true;
    }
  }

  FiltrarPorEspecialista(usuario: User){
    // console.log("sale evento emiter "+usuario);
    this.eventEspecialistaSeleccionado.emit(usuario);
    this.eventMostrar.emit(true);

  }



}
