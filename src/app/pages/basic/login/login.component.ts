import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() eventUserLogin: EventEmitter<any> = new EventEmitter<any>();
  
  isSignedIn= false;
  errorIngreso=false;
  emailIngreso: string = "";
  contraIngreso: string = "";
  listaUsuarios: any[];
  mostrar = false;

  constructor(public firebaseService: AuthFirebaseService, private router: Router, private usuariosFire: UsuariosFirebaseService) { 
    this.usuariosFire.getAll().subscribe(listado =>{
         this.listaUsuarios=listado;
    });
  }

  ngOnInit(): void {
  }
  
  async OnSignIn(email:string, password: string){
    try {
      const user = await this.firebaseService.SignIn(email,password);
      this.checkUserIsVerified(user);
      localStorage.setItem('usuario', email);
    } catch (error) {
      this.router.navigate(['/registro']);
      console.log(error);     
    }
  }

  private checkUserIsVerified(user: User) {
    
    if (user && user.emailVerified) {
      this.isSignedIn = true;
      let role = this.usuariosFire.obtenerRole(user.email)
      console.log(role);
      this.eventUserLogin.emit(role)      
      this.router.navigate(['/']);
    } else if (user) {
      this.router.navigate(['/verificacion-email']);
    } else {
      this.router.navigate(['/registro']);
    }
  }


  CompletaIngreso(){
    this.emailIngreso= "admin@admin.com";
    this.contraIngreso = "123456";
  }

  Mostrar(){
    this.mostrar = !this.mostrar;
  }

}
