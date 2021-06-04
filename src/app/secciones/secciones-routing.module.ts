import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { PedirTurnoComponent } from './pedir-turno/pedir-turno.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'misturnos', component: MisTurnosComponent },
  { path: 'miperfil', component: MiPerfilComponent },
  { path: 'pedirturno', component: PedirTurnoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionesRoutingModule { }
