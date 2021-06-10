import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../clases/historia-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaFirebaseService {

  private dbpath = '/historiaClinica'; //ruta de la coleccion de firebase.
  historiaClinicaRef: AngularFirestoreCollection<HistoriaClinica>;
  historiasClinicas:Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.historiaClinicaRef=db.collection(this.dbpath);
    this.historiasClinicas=this.historiaClinicaRef.valueChanges(this.dbpath);
  }


  getAll(){
    return this.historiasClinicas;
  }

  create(historiaClinica: HistoriaClinica): any{
    console.log("Entro a funcion createeeeeeeee");
    return this.historiaClinicaRef.add({...historiaClinica});
  }


  update(id: string, data: any): Promise<void> {
    return this.historiaClinicaRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.historiaClinicaRef.doc(id).delete();
  }
}
