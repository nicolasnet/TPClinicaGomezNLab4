import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  public forma: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido':['', [Validators.required], this.spaceValidator],
      'edad': ['', Validators.required],
      'DNI': ['', [Validators.required, Validators.max(99999999)]],
      'email': ['', [Validators.email, Validators.required]],
      'OS': ['', Validators.required],
      'password': ['', Validators.required],
      'imgFrente': ['', Validators.required],
      'imgPerfil': ['', Validators.required],
    });
  }
  
  private async spaceValidator(control: AbstractControl): Promise<object>{
    console.log("entra en spaceControl");
    const nombre = <string> control.value;
    const espacios = nombre.includes(' ');

    if(espacios){
      return {
        contieneEspacios: true
      };
    }else{
      return null;
    }
  }

  toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();   
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



  NuevoRegistro(){

  }

}
