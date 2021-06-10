import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SeccionesRoutingModule } from './secciones-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PedirTurnoComponent } from './pedir-turno/pedir-turno.component';
import { ListadoEspecialidadesComponent } from './pedir-turno/listado-especialidades/listado-especialidades.component';
import { PagePedirTurnoComponent } from './pedir-turno/page-pedir-turno/page-pedir-turno.component';
import { ListadoTurnosComponent } from './pedir-turno/listado-turnos/listado-turnos.component';
import { ListadoEspecialistasComponent } from './pedir-turno/listado-especialistas/listado-especialistas.component';
import { MisTurnosEspecialistasComponent } from './mis-turnos-especialistas/mis-turnos-especialistas.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    MisTurnosComponent,
    MiPerfilComponent,
    PedirTurnoComponent,
    ListadoEspecialidadesComponent,
    PagePedirTurnoComponent,
    ListadoTurnosComponent,
    ListadoEspecialistasComponent,
    MisTurnosEspecialistasComponent,
    HistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    SeccionesRoutingModule,
    SharedModule
  ]
})
export class SeccionesModule { }
