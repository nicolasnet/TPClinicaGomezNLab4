import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosFirebaseService {

  private dbpath = '/turnos'; //ruta de la coleccion de firebase.
  mensajesRef: AngularFirestoreCollection<Turno>;
  mensajes:Observable<any[]>;
  turnoSeleccionado: unknown;
  idTurnoSeleccionado: string;
  listadoTurnosDisponibles;
  listadoTurnosDisponiblesRef;

  constructor(private db: AngularFirestore) {
    this.listadoTurnosDisponiblesRef=db.collection<any>(this.dbpath, ref => ref.where('estado', '==', "disponible").orderBy('dia'));
    this.listadoTurnosDisponibles=this.listadoTurnosDisponiblesRef.valueChanges(this.dbpath);

    this.mensajesRef=db.collection<any>(this.dbpath, ref => ref.orderBy('dia'));
    this.mensajes=this.mensajesRef.valueChanges(this.dbpath);

  }

  obtenerTurnosDisponibles(){
    return this.listadoTurnosDisponibles;
  }

  getAll(){
    return this.mensajes;
  }

  async obtenerTurnosPaciente(email: string){
    await this.db.collection('/turnos').ref.where('paciente.email', '==', email).get().then((responce)=>{
      console.log("entra en obtenerTurnosPaciente")
      this.turnoSeleccionado = responce.docs;
    });
  }



  async obtenerTurnoPorId (id: string){
    await this.db.collection('/turnos').ref.where('id', '==', id).get().then((responce)=>{
      this.turnoSeleccionado = responce.docs[0].data();
      this.idTurnoSeleccionado = responce.docs[0].id;

      // console.log(responce.docs[0].data());
    });
  }

  async obtenerTurnoPorEspecialidad (especialidad: string){
    await this.db.collection('/turnos').ref.where('especialidad', '==', especialidad).get().then((responce)=>{
      this.turnoSeleccionado = responce.docs[0].data();
    });
  }
 



  create(mensaje: Turno): any{
    console.log("Entro a funcion create de TURNOS");
    return this.mensajesRef.add({...mensaje});
  }


  update(id: string, data: any): Promise<void> {
    return this.mensajesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.mensajesRef.doc(id).delete();
  }
}
