import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/clases/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { FileFirestoreService, MEDIA_STORAGE_PATH } from 'src/app/services/file-firestore.service';
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

  constructor(private authSvc: AuthFirebaseService, private usuarioService: UsuariosFirebaseService, private storageService: FileFirestoreService) {
    this.email = localStorage.getItem('usuario');
    this.storageService.referenciaCloudStorage(MEDIA_STORAGE_PATH + "nicogomez27@gmail.com-imgPerfil.jpg")
        .getDownloadURL().pipe(take(1)).subscribe(url => {
            this.url = url;
            console.log(this.url)
        })
    this.obtenerUsuarioLogueado();
    
    // this.img = this.storageService.downloadImgage();
    
    
   }

  ngOnInit(): void {

  }

  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;    
    console.log(this.url);
  }

}
