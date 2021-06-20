import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorNavbarIcono]'
})
export class ColorNavbarIconoDirective implements OnInit{

  @Input() appColorNavbarIcono;

  constructor(private el: ElementRef) { }

  ngOnInit(){
    this.cambioColor(this.appColorNavbarIcono)
  }

  
  private cambioColor(role: string){
    switch(role){
      case "admin":
        this.el.nativeElement.style.color = 'lightskyblue';
        break;
      case "paciente":
          this.el.nativeElement.style.color = 'lightseagreen';
        break;
      case "especialista":
        this.el.nativeElement.style.color = 'lightcoral';
        break;
      default:
        this.el.nativeElement.style.color = 'white';
        break;
    }
    
  }

}
