import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/basic/bienvenido/bienvenido.component';
import { EmailVerificationComponent } from './pages/basic/email-verification/email-verification.component';
import { ErrorComponent } from './pages/basic/error/error.component';
import { LoginComponent } from './pages/basic/login/login.component';
import { RegistroComponent } from './pages/basic/registro/registro.component';

const routes: Routes = [
  
  { path: 'bienvenido', component: BienvenidoComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'verificacion-email', component: EmailVerificationComponent},
  { path: 'secciones', loadChildren: () => import('./secciones/secciones.module').then(m => m.SeccionesModule) },
  { path: '', component: BienvenidoComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
