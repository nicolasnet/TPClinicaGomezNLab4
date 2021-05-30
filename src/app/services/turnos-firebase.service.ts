import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosFirebaseService {

  private dbpath = '/misHorarios'; //ruta de la coleccion de firebase.
  mensajesRef: AngularFirestoreCollection<Turno>;
  mensajes:Observable<any[]>;
  turnoSeleccionado: unknown;
  ultimoId: number;

  constructor(private db: AngularFirestore) {
    this.mensajesRef=db.collection<any>(this.dbpath, ref => ref.orderBy('id'));
    this.mensajes=this.mensajesRef.valueChanges(this.dbpath);
  }


  getAll(){
    return this.mensajes;
  }

  async obtenerTurnoPorId (id: number){
    await this.db.collection('/usuarios').ref.where('id', '==', id).get().then((responce)=>{
      this.turnoSeleccionado = responce.docs[0].data();
      // console.log(responce.docs[0].data());
    });
  }

  async obtenerTurnoPorEspecialidad (especialidad: string){
    await this.db.collection('/usuarios').ref.where('especialidad', '==', especialidad).get().then((responce)=>{
      this.turnoSeleccionado = responce.docs[0].data();
      // console.log(responce.docs[0].data());
    });
  }
 
  create(mensaje: Turno): any{
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
