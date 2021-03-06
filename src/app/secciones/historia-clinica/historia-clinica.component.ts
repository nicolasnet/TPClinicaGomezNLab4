import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriaClinicaFirebaseService } from 'src/app/services/historia-clinica-firebase.service';
import { PDFCreatorService } from 'src/app/services/pdfcreator.service';
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
  imagen: any;
  now: Date;

  constructor(private navegador: Router, private usuarioService: UsuariosFirebaseService, private historiaClinicaServ: HistoriaClinicaFirebaseService, private pdfServ: PDFCreatorService) {
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
    this.imagen = this.usuario.imgPerfil
  }

  async obtenerHistoriaClinicaDelPaciente(){
    this.now = new Date(),
    await this.historiaClinicaServ.obtenerHistoriaClinicaConEmailPaciente(this.email);
    this.listadoHistoriaClinica = this.historiaClinicaServ.hisotriaClinicaSeleccionada;
    for (let index = 0; index < this.listadoHistoriaClinica.length; index++) {
      const element = this.listadoHistoriaClinica[index].data();
      this.listadoFinal.push(element);      
    }
  }

  ImprimirPDF(){    
    this.pdfServ.PDFdownloadByHTMLid('historiaClinica', 'HistoriaClinica'+'_'+this.usuario.email);
    // this.pdfServ.paginado();
  }

}
