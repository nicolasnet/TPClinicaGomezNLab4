import { Injectable } from '@angular/core';
import { DiasLaborables } from '../clases/dias-laborables';

@Injectable({
  providedIn: 'root'
})
export class DiasLaborablesService {

  public listadoDiasLaborables =  Array<DiasLaborables>();

  constructor() {
    this.listadoDiasLaborables=[
      {'id': 0, 'nombre': "Lunes"},
      {'id': 1, 'nombre': "Martes"},
      {'id': 2, 'nombre': "Miercoles"},
      {'id': 3, 'nombre': "Jueves"},
      {'id': 4, 'nombre': "Viernes"},
      {'id': 5, 'nombre': "Sabado"},
    ]
   }
}
