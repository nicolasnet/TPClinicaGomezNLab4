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
    
  isSignedIn= false;
  errorIngreso=false;
  emailIngreso: string = "";
  contraIngreso: string = "";
  listaUsuarios: any[];
  mostrar = false;
  usuarioLogueado;


  constructor(public firebaseService: AuthFirebaseService, private router: Router, private usuariosFire: UsuariosFirebaseService) { 
    // this.usuariosFire.getAll().subscribe(listado =>{
    //      this.listaUsuarios=listado;
    // });
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

  private async checkUserIsVerified(user: User) {
    console.log("entra en chequeo de usuario")
    if (user && user.emailVerified) {
      await this.usuariosFire.obtenerUsuario(user.email);
      this.usuarioLogueado = this.usuariosFire.usuarioSeleccionado;
      console.log(this.usuarioLogueado.role);
      if(this.usuarioLogueado.role == 'especialista'){
        console.log("entra en login para especialista");
        if(!this.usuarioLogueado.verificacionEspec){
          console.log("entra en login para especialista sin verificacion por Admin");
          this.router.navigate(['/verificacion-especialista']);
        }else{
          localStorage.setItem('role', this.usuarioLogueado.role);
          console.log("LOGIN: el Role que loguea es: "+this.usuarioLogueado.role);
          this.router.navigate(['/']);
        }
      }else{
        localStorage.setItem('role', this.usuarioLogueado.role);
        console.log("LOGIN: el Role que loguea es: "+this.usuarioLogueado.role);
        this.router.navigate(['/']);
      }      
    } else if (user) {
      this.router.navigate(['/verificacion-email']);
    } else {
      this.router.navigate(['/registro']);
    }
  }


  CompletaIngreso(ingreso: string){
    switch(ingreso){
      case "adm1":
        this.emailIngreso= "nicogomez27@gmail.com";
        this.contraIngreso = "123456";
        break;
      case "adm2":
        this.emailIngreso= "niconetgomez@hotmail.com";
        this.contraIngreso = "123456";
        break;
      case "paciente1":
        this.emailIngreso= "federicomgomez1@gmail.com";
        this.contraIngreso = "123456";
        break;
      case "paciente2":
        this.emailIngreso= "chewy275@gmail.com";
        this.contraIngreso = "123456";
        break;
      case "especialista1":
        this.emailIngreso= "micaela.comelli25@gmail.com";
        this.contraIngreso = "123456";
        break;
      case "especialista2":
        this.emailIngreso= "santiago.ezequiel.gomez@gmail.com";
        this.contraIngreso = "123456";
        break;
    }
    
  }

  Mostrar(){
    this.mostrar = !this.mostrar;
  }
}
