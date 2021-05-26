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
    return this.storage.storage.refFromURL("gs://gomezn-tpfinal-clinica.appspot.com/images/nuevo4@nuevo.com-imgFrente.jpg")
  }

}
