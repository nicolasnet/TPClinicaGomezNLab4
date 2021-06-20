import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableExporterModule } from 'mat-table-exporter';

import { SharedRoutingModule } from './shared-routing.module';
import { LoadingComponent } from '../pages/basic/loading/loading.component';
import { NavbarComponent } from '../pages/basic/navbar/navbar.component';

import { TurnosDatePipe } from '../pipes/turnos-date.pipe';
import { ColorTipoDeEstadoTurnoDirective } from '../directivas/color-tipo-de-estado-turno.directive';
import { ColorNavbarFondoDirective } from '../directivas/color-navbar-fondo.directive';
import { ColorNavbarIconoDirective } from '../directivas/color-navbar-icono.directive';

const materialFormModule =[
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  MatGridListModule,
  MatTableExporterModule,
  FormsModule,
  ReactiveFormsModule  
]

@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent,
    TurnosDatePipe,
    ColorTipoDeEstadoTurnoDirective,
    ColorNavbarFondoDirective,
    ColorNavbarIconoDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    materialFormModule
    
  ],
  exports: [materialFormModule, LoadingComponent, NavbarComponent, TurnosDatePipe, ColorTipoDeEstadoTurnoDirective, ColorNavbarFondoDirective, ColorNavbarIconoDirective]
})
export class SharedModule { }
