import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Turno } from '../clases/turno';

@Directive({
  selector: '[appColorTipoDeEstadoTurno]'
})
export class ColorTipoDeEstadoTurnoDirective implements OnInit{

  @Input() appColorTipoDeEstadoTurno;

  constructor(private el: ElementRef) { }

  ngOnInit(){
    this.cambioColor(this.appColorTipoDeEstadoTurno)
  }


  private cambioColor(turno: Turno){
    switch(turno.estado){
      case "finalizado":
        this.el.nativeElement.style.color = 'blue';
        this.el.nativeElement.style.opacity = '50%';
        break;
      case "aceptado":        
          this.el.nativeElement.style.color = 'lightseagreen';
        break;
      case "rechazado":
        this.el.nativeElement.style.color = 'red';
        break;
      case "ocupado":
        this.el.nativeElement.style.color = 'orange';
        break;
    }
    
  }

}
