import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesFireService {

  private dbpath = '/especialidades'; //ruta de la coleccion de firebase.
  mensajesRef: AngularFirestoreCollection<Especialidad>;
  mensajes:Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.mensajesRef=db.collection<any>(this.dbpath, ref => ref.orderBy('nombre'));
    this.mensajes=this.mensajesRef.valueChanges(this.dbpath);
  }


  getAll(){
    return this.mensajes;
  }

  create(mensaje: Especialidad): any{
    console.log("Entro a funcion createeeeeeeee");
    return this.mensajesRef.add({...mensaje});
  }


  update(id: string, data: any): Promise<void> {
    return this.mensajesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.mensajesRef.doc(id).delete();
  }

}
