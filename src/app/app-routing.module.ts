import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/basic/bienvenido/bienvenido.component';
import { EmailVerificationComponent } from './pages/basic/email-verification/email-verification.component';
import { ErrorComponent } from './pages/basic/error/error.component';
import { EspecialistaVerificationComponent } from './pages/basic/especialista-verification/especialista-verification.component';
import { LoginComponent } from './pages/basic/login/login.component';
import { RegistroComponent } from './pages/basic/registro/registro.component';

const routes: Routes = [
  
  { path: 'bienvenido', component: BienvenidoComponent, data: {animation: 'HomePage'}},
  { path: 'login', component: LoginComponent, data: {animation: 'Login'}},
  { path: 'registro', component: RegistroComponent, data: {animation: 'Registro'}},
  { path: 'verificacion-email', component: EmailVerificationComponent},
  { path: 'verificacion-especialista', component: EspecialistaVerificationComponent},
  { path: 'secciones', loadChildren: () => import('./secciones/secciones.module').then(m => m.SeccionesModule)},
  { path: '', component: BienvenidoComponent, data: {animation: 'HomePage'}},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
