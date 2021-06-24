import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { PDFCreatorService } from 'src/app/services/pdfcreator.service';

import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { EspecialidadesFireService } from 'src/app/services/especialidades-fire.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  VIDEOGAMES = [
    {
      id : 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference : "1-770-736-8031"
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323"
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334"
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532"
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245"
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321"
    }
  ];

  iniciado: boolean
  public user$: Observable<any> = this.authSvc.firebaseAuth.user;
  listaEspecialidades: any[];
  barChart: Options;
  chart: Chart;
  listadosEspecialidadesNombre = new Array<string>();
  listadoFinal = new Array<string>();
  mostrar: boolean;

  

  constructor(private authSvc: AuthFirebaseService) {    
    
  }

  ngOnInit(): void {
  }
  


}

