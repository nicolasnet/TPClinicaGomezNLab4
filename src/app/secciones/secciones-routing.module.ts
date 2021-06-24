import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from './admin/informes/informes.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisTurnosEspecialistasComponent } from './mis-turnos-especialistas/mis-turnos-especialistas.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { ListadoEspecialidadesComponent } from './pedir-turno/listado-especialidades/listado-especialidades.component';
import { PagePedirTurnoComponent } from './pedir-turno/page-pedir-turno/page-pedir-turno.component';
import { PedirTurnoComponent } from './pedir-turno/pedir-turno.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { TurnosTomadosComponent } from './admin/turnos-tomados/turnos-tomados.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'misturnos', component: MisTurnosComponent },
  { path: 'misturnosespecialistas', component: MisTurnosEspecialistasComponent },
  { path: 'miperfil', component: MiPerfilComponent },
  { path: 'historiaclinica', component: HistoriaClinicaComponent },
  { path: 'todosLosTurnos', component: PedirTurnoComponent },
  { path: 'pedirturno', component: PagePedirTurnoComponent },
  { path: 'informes', component: InformesComponent },
  { path: 'turnostomados', component: TurnosTomadosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionesRoutingModule { }
