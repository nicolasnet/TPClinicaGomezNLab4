import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnDestroy {

  public user$: Observable<any> = this.authSvc.firebaseAuth.user;
  emailEnviado: boolean;

  constructor(private authSvc: AuthFirebaseService) {}

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
    this.emailEnviado = true;
  }

  ngOnDestroy() {
    this.authSvc.LogOut();
  }

}
