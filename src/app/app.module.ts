import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BienvenidoComponent } from './pages/basic/bienvenido/bienvenido.component';
import { ErrorComponent } from './pages/basic/error/error.component';
import { LoginComponent } from './pages/basic/login/login.component';
import { RegistroComponent } from './pages/basic/registro/registro.component';
import { NavbarComponent } from './pages/basic/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailVerificationComponent } from './pages/basic/email-verification/email-verification.component';
import { LoadingComponent } from './pages/basic/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    EmailVerificationComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
