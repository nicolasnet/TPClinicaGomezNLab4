import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileI } from '../clases/file-i';
import { UsuariosFirebaseService } from './usuarios-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FileFirestoreService {

  private filePath: any;
  public downloadURL: Observable<string>;
  imgUrl: string;


  constructor(
    private storage: AngularFireStorage, private usuariosServ: UsuariosFirebaseService
  ) { }

  public uploadImage(image: FileI, nombre: string, emailUsuario: string, tipoDeFoto: string) {
    this.filePath = `images/${nombre}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async urlImage => {
            // console.log("dentro del servicio: "+urlImage);
            await this.usuariosServ.obtenerID(emailUsuario);

            switch(tipoDeFoto){
              case "imgPerfil":
                this.usuariosServ.update(this.usuariosServ.id, {imgPerfil: urlImage});
                break;
              case "imgFrente":
                this.usuariosServ.update(this.usuariosServ.id, {imgFrente: urlImage});
                break;
            }
            
            // this.imgUrl = urlImage;
            // console.log("dentro del servicio: "+this.imgUrl);
            // console.log("termino de subir foto POSTA");
          });
        })
      ).subscribe();
  }

  // public downloadImgage(){
  //   // let storage1 = "gomezn-tpfinal-clinica.appspot.com";
  //   let storageRef = this.storage.ref("gomezn-tpfinal-clinica.appspot.com");
  //   let imagesRef = storageRef.child('images');
  //   storageRef.child('images/nicogomez27@gmail.com-imgPerfil.jpg').getDownloadURL().then(function(url){
  //     return url;
  //   })

  // }

     //Tarea para subir archivo
     public tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
    }
  
    //Referencia del archivo
    public referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }




}
export const FotosUsuario_STORAGE_PATH = `/images/`;