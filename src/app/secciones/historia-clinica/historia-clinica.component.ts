import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';

import { HistoriaClinicaFirebaseService } from 'src/app/services/historia-clinica-firebase.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  email: string;
  usuario: any;
  listadoHistoriaClinica = new Array<any>();
  listadoFinal = new Array<any>();

  constructor(private navegador: Router, private usuarioService: UsuariosFirebaseService, private historiaClinicaServ: HistoriaClinicaFirebaseService) {
    this.email = localStorage.getItem('usuario');
    // this.storageService.referenciaCloudStorage(FotosUsuario_STORAGE_PATH + this.email+"-imgPerfil.jpg")
    //     .getDownloadURL().pipe(take(1)).subscribe(url => {
    //         this.url = url;
    //         console.log(this.url)
    //     })
    this.obtenerUsuarioLogueado();
    this.obtenerHistoriaClinicaDelPaciente();

   }

  ngOnInit(): void {
  }

  async obtenerUsuarioLogueado(){
    await this.usuarioService.obtenerUsuario(this.email)
    this.usuario = this.usuarioService.usuarioSeleccionado;
  }

  async obtenerHistoriaClinicaDelPaciente(){
    await this.historiaClinicaServ.obtenerHistoriaClinicaConEmailPaciente(this.email);
    this.listadoHistoriaClinica = this.historiaClinicaServ.hisotriaClinicaSeleccionada;
    for (let index = 0; index < this.listadoHistoriaClinica.length; index++) {
      const element = this.listadoHistoriaClinica[index].data();
      this.listadoFinal.push(element);
      
    }
  }

  ImprimirPDF(){
    
    
    const doc = new jsPDF();

    doc.fromHTML(document.getElementById('historiaClinica'), 10, 10);
    doc.save("HistoriaClinica.pdf");
  }

}
