import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab4ClinicaTPFinal-GomezN';
  roleSeleccionado: string;

  CargarRoleDelLogin(role: string){
    this.roleSeleccionado = role;
    console.log("entra en funcion app component")
  }

}


