import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFirebaseService {

  private dbpath = '/usuarios'; //ruta de la coleccion de firebase.
  usuariosRef: AngularFirestoreCollection<User>;
  usuarios:Observable<any[]>;
  id: string;
  role: string;
  usuarioSeleccionado: any;

  constructor(private db: AngularFirestore) {
    this.usuariosRef=db.collection<any>(this.dbpath, ref => ref.orderBy('apellido'));
    this.usuarios=this.usuariosRef.valueChanges(this.dbpath);
  }


  async obtenerID(email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.id = responce.docs[0].id;
      
    });
  }

  async obtenerRole(email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.role = responce.docs[0].data()["role"];
      console.log(responce.docs[0].data()["role"]);
    });
  }

  async obtenerUsuario(email: string){
    await this.db.collection('/usuarios').ref.where('email', '==', email).get().then((responce)=>{
      this.usuarioSeleccionado = responce.docs[0].data();
      // console.log(responce.docs[0].data());
    });
  }


  getAll(){
    return this.usuarios;
  }

  create(mensaje: User): any{
    let data = this.usuariosRef.add({...mensaje});
    
    return data;
  }


  update(id: string, data: any): Promise<void> {
    return this.usuariosRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usuariosRef.doc(id).delete();
  }
}
