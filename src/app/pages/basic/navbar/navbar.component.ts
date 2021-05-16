import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentNavItem: string;

  constructor(private navegador: Router) {
    this.currentNavItem = "prueba1"
   }

  ngOnInit(): void {
  }

  Navegar(ruta: string){
    this.navegador.navigate([ruta]);
  }

  

}
