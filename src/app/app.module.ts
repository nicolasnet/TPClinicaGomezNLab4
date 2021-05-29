import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BienvenidoComponent } from './pages/basic/bienvenido/bienvenido.component';
import { ErrorComponent } from './pages/basic/error/error.component';
import { LoginComponent } from './pages/basic/login/login.component';
import { RegistroComponent } from './pages/basic/registro/registro.component';
import { EmailVerificationComponent } from './pages/basic/email-verification/email-verification.component';
import { SharedModule } from './shared/shared.module';
import { SeccionesModule } from './secciones/secciones.module';
import { EspecialistaVerificationComponent } from './pages/basic/especialista-verification/especialista-verification.component';




@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    EmailVerificationComponent,
    EspecialistaVerificationComponent
  ],
  imports: [
    SharedModule,
    SeccionesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    NgxCaptchaModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
