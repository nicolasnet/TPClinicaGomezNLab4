import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaFirebaseService {

  private dbpath = '/encuestas'; //ruta de la coleccion de firebase.
  encuestaRef: AngularFirestoreCollection<Encuesta>;
  encuestas:Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.encuestaRef=db.collection(this.dbpath);
    this.encuestas=this.encuestaRef.valueChanges(this.dbpath);
  }


  getAll(){
    return this.encuestas;
  }

  create(encuesta: Encuesta): any{
    console.log("Entro a funcion createeeeeeeee");
    return this.encuestaRef.add({...encuesta});
  }


  update(id: string, data: any): Promise<void> {
    return this.encuestaRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.encuestaRef.doc(id).delete();
  }
}
