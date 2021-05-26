import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public user$: Observable<any> = this.authSvc.firebaseAuth.user;

  constructor(private navegador: Router, private authSvc: AuthFirebaseService) {

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
