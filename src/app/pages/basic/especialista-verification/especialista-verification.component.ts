import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-especialista-verification',
  templateUrl: './especialista-verification.component.html',
  styleUrls: ['./especialista-verification.component.css']
})
export class EspecialistaVerificationComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.firebaseAuth.user;

  constructor(private authSvc: AuthFirebaseService) {}

  ngOnInit(): void {
  }

}
