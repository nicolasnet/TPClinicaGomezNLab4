import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { User } from 'src/app/clases/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { EspecialidadesFireService } from 'src/app/services/especialidades-fire.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  paciente=false;
  especialista=false;
  muestra=false;
  public forma: FormGroup;
  listaEspecialidades:any;
  prueba: Especialidad = new Especialidad("Odontologia");
  prueba2: Especialidad = new Especialidad("Dermatologia");
  
  errorIngreso=false;

  constructor(private fb: FormBuilder, public firebaseService: AuthFirebaseService, private router: Router, private especialidadesService: EspecialidadesFireService) {
    this.especialidadesService.getAll().subscribe(listado =>{
      
      this.listaEspecialidades=listado;
    })
    // this.especialidadesService.create(this.prueba);
    // this.especialidadesService.create(this.prueba2);
   }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido':['', [Validators.required], this.spaceValidator],
      'edad': ['',[Validators.required, Validators.min(16), Validators.max(99)]],
      'DNI': ['', [Validators.required, Validators.max(99999999)]],
      'email': ['', [Validators.email, Validators.required]],
      'OS': ['', Validators.required],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'imgFrente': ['', Validators.required],
      'especialidad': ['', Validators.required],
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


  async NuevoRegistro(){
    
    if(this.forma.get('password').value == this.forma.get('password2').value){
      this.errorIngreso = false;
      try {
        const user = await this.firebaseService.SignUp(this.forma.get('email').value, this.forma.get('password').value);
        if (user) {
          this.checkUserIsVerified(user);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      this.errorIngreso = true;
    }
  }
  
  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/']);
      localStorage.setItem('usuario',this.forma.get('email').value)
    } else if (user) {
      this.router.navigate(['/verificacion-email']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  Mostrar(tipo: string){
    this.muestra=true;

    if(tipo == "paciente"){
      this.paciente = true;
      this.especialista = false
    }else{
      this.especialista = true;
      this.paciente = false;
    }
  }


}
