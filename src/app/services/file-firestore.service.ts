import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileI } from '../clases/file-i';

@Injectable({
  providedIn: 'root'
})
export class FileFirestoreService {

  private filePath: any;
  private downloadURL: Observable<string>;
  imgUrl: string;


  constructor(
    private storage: AngularFireStorage
  ) { }

  public uploadImage(image: FileI, nombre: string) {
    this.filePath = `images/${nombre}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
          });
        })
      ).subscribe();
  }

  public downloadImgage(){
    // let storage1 = "gomezn-tpfinal-clinica.appspot.com";
    let storageRef = this.storage.ref("gomezn-tpfinal-clinica.appspot.com");
    let imagesRef = storageRef.child('images');
    storageRef.child('images/nicogomez27@gmail.com-imgPerfil.jpg').getDownloadURL().then(function(url){
      return url;
    })

  }

     //Tarea para subir archivo
     public tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
    }
  
    //Referencia del archivo
    public referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }




}
export const MEDIA_STORAGE_PATH = `/images/`;