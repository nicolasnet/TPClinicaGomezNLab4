import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SeccionesRoutingModule } from './secciones-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PedirTurnoComponent } from './pedir-turno/pedir-turno.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    MisTurnosComponent,
    MiPerfilComponent,
    PedirTurnoComponent
  ],
  imports: [
    CommonModule,
    SeccionesRoutingModule,
    SharedModule
  ]
})
export class SeccionesModule { }
