import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  isLoggedIn = false;

  constructor(public firebaseAuth: AngularFireAuth) {  }

  async SignIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async SignUp(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res=>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  LogOut(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }



  
  getAuth()
  {
    return this.firebaseAuth.currentUser;
  }
}
