import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { User } from '../clases/user';

@Directive({
  selector: '[appColorTipoDeUsuario]'
})
export class ColorTipoDeUsuarioDirective implements OnInit{

  @Input() appColorTipoDeUsuario;

  constructor(private el: ElementRef) { }

  ngOnInit(){
    this.cambioColor(this.appColorTipoDeUsuario)
  }

  private cambioColor(usuario: User){
    switch(usuario.role){
      case "paciente":
        this.el.nativeElement.style.color = 'blue';
        break;
      case "especialista":
        if(usuario.verificacionEspec){
          this.el.nativeElement.style.color = 'lightseagreen';
        }else{
          this.el.nativeElement.style.color = 'red';
        }
        break;
      case "admin":
        this.el.nativeElement.style.color = 'black';
        break;
    }
    
  }

}
