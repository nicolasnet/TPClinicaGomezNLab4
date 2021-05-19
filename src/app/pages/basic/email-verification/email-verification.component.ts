import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnDestroy {

  public user$: any;

  constructor(private authSvc: AuthFirebaseService) {}

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    this.authSvc.LogOut();
  }

}
