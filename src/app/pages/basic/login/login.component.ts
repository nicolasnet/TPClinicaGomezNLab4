import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
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
    console.log(user.emailVerified +" "+ user)
    if (user && user.emailVerified) {
      this.isSignedIn = true;
      this.router.navigate(['/']);
    } else if (user) {
      this.router.navigate(['/verificacion-email']);
    } else {
      this.router.navigate(['/registro']);
    }
  }


  CompletaIngreso(){
    console.log("entro a completar");
    this.emailIngreso= "admin@admin.com";
    this.contraIngreso = "123456";
  }

}
