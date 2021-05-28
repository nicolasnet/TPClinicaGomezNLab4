import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @Input() roleLogueado: string

  public user$: Observable<User> = this.authSvc.firebaseAuth.user;
  usuario: User;

  constructor(private navegador: Router, private authSvc: AuthFirebaseService) {
    // console.log(this.user$)
    console.log("navbar Role: " + this.roleLogueado)
   }

  ngOnInit(): void {
  }

  Navegar(ruta: string){
    this.navegador.navigate([ruta]);
  }

  Desconectarse(){
    this.authSvc.LogOut();
    this.Navegar("");
  }

  

}
