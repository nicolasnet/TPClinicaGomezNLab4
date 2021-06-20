import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorNavbarFondo]'
})
export class ColorNavbarFondoDirective implements OnInit{

  @Input() appColorNavbarFondo;

  constructor(private el: ElementRef) { }

  ngOnInit(){
    this.cambioColor(this.appColorNavbarFondo)
  }

  
  private cambioColor(role: string){
    switch(role){
      case "admin":
        this.el.nativeElement.style.background= 'url("../../../../assets/Imagenes/texturaAzul.jpg")';
        break;
      case "paciente":
        this.el.nativeElement.style.background= 'url("../../../../assets/Imagenes/texturaVerde.jpg")';
        break;
      case "especialista":
        this.el.nativeElement.style.background= 'url("../../../../assets/Imagenes/texturaRoja.jpg")';
        break;
      default:
        this.el.nativeElement.style.color = 'white';
        break;
    }
    
  }
}
