import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

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

  constructor(public firebaseService: AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
  }
  
 async OnSignIn(email:string, password: string){
  console.log(this.firebaseService.isLoggedIn);

  await this.firebaseService.SignIn(email,password);
  if(this.firebaseService.isLoggedIn){
    console.log("autorizado");
    localStorage.setItem('usuario', email)
    this.isSignedIn = true;
    this.router.navigate(['/bienvenido']);
  }
  else{
    this.errorIngreso=true;
    console.log("Error");
  }
}



CompletaIngreso(){
  console.log("entro a completar");
  this.emailIngreso= "admin@admin.com";
  this.contraIngreso = "123456";
}

}
