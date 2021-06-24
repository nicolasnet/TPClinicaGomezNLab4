import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { PDFCreatorService } from 'src/app/services/pdfcreator.service';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { EspecialidadesFireService } from 'src/app/services/especialidades-fire.service';
import { TurnosFirebaseService } from 'src/app/services/turnos-firebase.service';
import { DiasLaborablesService } from 'src/app/services/dias-laborables.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements  AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'email','tipo', 'ultimoLogin', 'todosLosLogin'];
  public dataSource: MatTableDataSource<any>
  listaUsuarios:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsIngresos: string[] = ['nombre', 'apellido', 'todosLosLogin'];
  public dataSourceIngresos: MatTableDataSource<any>
  

  listaEspecialidades: any[];
  barChart: Options;
  chart: Chart;
  listadosEspecialidadesNombre = new Array<string>();
  listadoFinal: Array<string>;
  mostrar: boolean;
  listaNumeros = new Array<number>();
  listadoTurnos: any;
  listaNumerosPorDia = new Array<number>();
  usuarioElegido: User;
  
  

  constructor(private usuariosService: UsuariosFirebaseService, private pdfServ: PDFCreatorService, private especialidadesServ: EspecialidadesFireService, private turnosServ: TurnosFirebaseService, private diasLaboralesServ: DiasLaborablesService) {
    
    this.especialidadesServ.getAll().subscribe(listado =>{
      this.listaEspecialidades=listado;
      this.listaEspecialidades.forEach(element => {
        this.listadosEspecialidadesNombre.push(element.nombre);
      });
      this.listadoFinal = new Array<string>();
      for (const key in this.listadosEspecialidadesNombre) {
        if (Object.prototype.hasOwnProperty.call(this.listadosEspecialidadesNombre, key)) {
          this.listadoFinal.push(this.listadosEspecialidadesNombre[key]);          
        }       
      }
      console.info(this.listadoFinal);    
    });

    

    
    this.turnosServ.obtenerTurnosConPaciente().subscribe(listado =>{
      this.listadoTurnos=listado;

      for (let index = 0; index < this.diasLaboralesServ.listadoDiasLaborables.length; index++) {
        let contadorDias = 0;
          for (let i = 0; i < this.listadoTurnos.length; i++) {
           
           let dia = new Date(this.listadoTurnos[i].dia.toMillis());
            if (dia.getDay() == this.diasLaboralesServ.listadoDiasLaborables[index].id+1){
              contadorDias += 1;
            }            
          }
          this.listaNumerosPorDia.push(contadorDias);
        
      }
      
      for (let index = 0; index < this.listadosEspecialidadesNombre.length; index++) {
        let contador = 0;
          for (let i = 0; i < this.listadoTurnos.length; i++) {
            if (this.listadoTurnos[i].especialidad == this.listadosEspecialidadesNombre[index]){
              contador += 1;
            }            
          }
          this.listaNumeros.push(contador);
        
      }
      
    });

    this.usuariosService.getAll().subscribe(listado =>{        
      this.listaUsuarios=listado;
      this.dataSource = new MatTableDataSource(this.listaUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ImprimirPDF(){    
    this.pdfServ.PDFdownloadByHTMLid('grafico', 'Informes');
    // this.pdfServ.paginado();
  }

  TodosLosIngresos(usuario: User){
    this.usuarioElegido = usuario;
    (<HTMLInputElement>document.getElementById("tabla")).hidden = true;
    (<HTMLInputElement>document.getElementById("tablaIngresos")).hidden = false;
    this.dataSourceIngresos = new MatTableDataSource(usuario.ingresos);
  }

  
  generar(tipo: string){
    switch(tipo){
      case "cantTurnosPorEspecialidad":
        (<HTMLInputElement>document.getElementById("tabla")).hidden = true;
        (<HTMLInputElement>document.getElementById("tablaIngresos")).hidden = true;
        this.barChart = {
          chart: {
            type: 'bar',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: 'Cantidad de turnos tomados por Especialidad',
          },
          yAxis: {
            visible: true,
            gridLineColor: '#fff',
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            lineColor: '#fff',
            categories:  this.listadoFinal,
          },
        
          plotOptions: {
            series: {
              borderRadius: 6,
            } as any,
          },
        
          series: [
            {
              type: 'bar',
              color: '#406ef9',
              data: this.listaNumeros,
            },
          ],
        };
        this.chart = new Chart(this.barChart);
        this.mostrar = true;
        break;

      case "cantTurnosPorDia":
        (<HTMLInputElement>document.getElementById("tabla")).hidden = true;
        (<HTMLInputElement>document.getElementById("tablaIngresos")).hidden = true;
        this.barChart = {
          chart: {
            type: 'bar',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: 'Cantidad de turnos tomados por Dia',
          },
          yAxis: {
            visible: true,
            gridLineColor: '#fff',
          }, 
          legend: {
            enabled: false,
          },
          xAxis: {
            lineColor: '#fff',
            categories:  [
              "Lunes",
              "Martes",
              "Miercoles",
              "Jueves",
              "Viernes",
              "Sabado"
            ],
          },
        
          plotOptions: {
            series: {
              borderRadius: 6,
            } as any,
          },
        
          series: [
            {
              type: 'bar',
              color: '#f9406e',
              data: this.listaNumerosPorDia,
            },
          ],
        };
        this.chart = new Chart(this.barChart);
        this.mostrar = true;
        break;
        
      case "tablaUsuarios":
        (<HTMLInputElement>document.getElementById("tabla")).hidden = false;
        (<HTMLInputElement>document.getElementById("tablaIngresos")).hidden = true;
        this.mostrar = false;
        break;







    }

  }
    


}
