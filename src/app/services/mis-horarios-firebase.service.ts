import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MisHorarios } from '../clases/mis-horarios';

@Injectable({
  providedIn: 'root'
})
export class MisHorariosFirebaseService {

  private dbpath = '/misHorarios'; //ruta de la coleccion de firebase.
  mensajesRef: AngularFirestoreCollection<MisHorarios>;
  mensajes:Observable<any[]>;
  horarioSeleccionado: unknown;

  constructor(private db: AngularFirestore) {
    this.mensajesRef=db.collection<any>(this.dbpath, ref => ref.orderBy('email'));
    this.mensajes=this.mensajesRef.valueChanges(this.dbpath);
  }


  getAll(){
    return this.mensajes;
  }

  async obtenerHorarioPorMail (email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.horarioSeleccionado = responce.docs[0].data();
      // console.log(responce.docs[0].data());
    });
  }

  async obtenerHorarioPorEspecialidad (especialidad: string){
    await this.db.collection('/usuarios').ref.where('especialidad', '==', especialidad).get().then((responce)=>{
      this.horarioSeleccionado = responce.docs[0].data();
      // console.log(responce.docs[0].data());
    });
  }
 
  create(mensaje: MisHorarios): any{
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
