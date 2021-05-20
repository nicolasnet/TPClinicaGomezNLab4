import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  iniciado: boolean

  public user$: Observable<any> = this.authSvc.firebaseAuth.user;

  constructor(private authSvc: AuthFirebaseService) {}

  ngOnInit(): void {
  }


}
