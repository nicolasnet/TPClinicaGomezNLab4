import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { User } from 'src/app/clases/user';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { EspecialidadesFireService } from 'src/app/services/especialidades-fire.service';
import { FileFirestoreService } from 'src/app/services/file-firestore.service';
import { UsuariosFirebaseService } from 'src/app/services/usuarios-firebase.service';

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
  errorIngreso=false;
  imgPerfil: any;
  imgFrente: any;
  disabled = true;
  siteKey: string;

  pruebaIMG:any;
  role: any;

  constructor(private fb: FormBuilder,
    public firebaseService: AuthFirebaseService,
    private router: Router,
    private especialidadesService: EspecialidadesFireService,
    private usuarioService: UsuariosFirebaseService,
    private firebaseStorage: FileFirestoreService) {
      this.siteKey = '6LdvifwaAAAAAD3uKrRZK3ZzTbAkGezZLRrI7yZk';
      this.role = localStorage.getItem('role');
      console.log(this.role);
      this.especialidadesService.getAll().subscribe(listado =>{
        
        this.listaEspecialidades=listado;
      });

   }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido':['', [Validators.required], this.spaceValidator],
      'edad': ['',[Validators.required, Validators.min(16), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.max(99999999)]],
      'email': ['', [Validators.email, Validators.required]],      
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password2': ['', [Validators.required, Validators.minLength(6)]],
      'imgPerfil': ['', Validators.required],
      'reRaptcha': ['', Validators.required],
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

  toTitleCase(str: string) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();   
  }

  async NuevoRegistro(){    
    if(this.forma.get('password').value == this.forma.get('password2').value){
      this.errorIngreso = false;      
      try {
        const user = await this.firebaseService.SignUp(this.forma.get('email').value, this.forma.get('password').value);
        if (user) {
          this.subirArchivos();
          this.CreaUsuario();
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
    switch(tipo){
      case "paciente":
        this.forma.addControl('OS', new FormControl ('', Validators.required));
        this.forma.addControl('imgFrente', new FormControl ('', Validators.required));
        if(this.forma.controls.especialidad){
          console.log("el control no es nulo");
          this.forma.removeControl("especialidad");
          this.forma.removeControl("especialidadNueva");
        }
        this.muestra=true;
        this.paciente = true;
        this.especialista = false;
        break;
      case "especialista":
        this.forma.addControl('especialidad', new FormControl ('', Validators.required));
        this.forma.addControl('especialidadNueva', new FormControl ('', ));
        if(this.forma.controls.imgFrente){
          this.forma.removeControl("OS");
          this.forma.removeControl("imgFrente");
        }
        this.muestra=true;
        this.especialista = true;
        this.paciente = false;
        break;
      case "admin":
        this.forma.removeControl("OS");
        this.forma.removeControl("imgFrente");
        this.forma.removeControl("especialidad");
        this.forma.removeControl("especialidadNueva");
        this.muestra=true;
        this.especialista = false;
        this.paciente = false;
        break;
      case "volver":
        this.especialista = false;
        this.paciente = false;
        this.muestra=false;
        break;
    }
  }

  CreaUsuario(){
    const usuarioNuevo = new User;

    usuarioNuevo.nombre = this.toTitleCase(this.forma.get('nombre').value);
    usuarioNuevo.apellido = this.toTitleCase(this.forma.get('apellido').value);
    usuarioNuevo.email = this.forma.get('email').value.toLowerCase();
    usuarioNuevo.edad = this.forma.get('edad').value;
    usuarioNuevo.dni = this.forma.get('dni').value;
    usuarioNuevo.imgPerfil = this.forma.get('imgPerfil').value;
    if(this.paciente){
      usuarioNuevo.os = this.forma.get('OS').value;
      usuarioNuevo.imgFrente = this.forma.get('imgFrente').value;
      usuarioNuevo.role = "paciente";
    }else if(this.especialista){      
      usuarioNuevo.especialidad = this.forma.get('especialidad').value;
      usuarioNuevo.role = "especialista";
      if(this.forma.get('especialidadNueva').value){
        const nueva = new Especialidad;
        nueva.nombre = this.forma.get('especialidadNueva').value;
        usuarioNuevo.especialidad.push({'nombre': nueva.nombre});
        this.especialidadesService.create(nueva);
        usuarioNuevo.verificacionEspec = false;        
      }
      console.log(usuarioNuevo.especialidad);
    }else{
      usuarioNuevo.role = "admin"
    }
    

    this.usuarioService.create(usuarioNuevo);
  }

  public subirArchivos() {
     this.firebaseStorage.uploadImage(this.imgPerfil, this.forma.get('email').value + "-imgPerfil.jpg");
    if(this.paciente){
      this.firebaseStorage.uploadImage(this.imgFrente, this.forma.get('email').value + "-imgFrente.jpg");
    }
    
  }

  handleImgPerfil(event: any): void {
    this.imgPerfil = event.target.files[0];
  }
  handleImgFrente(event: any): void {
    this.imgFrente = event.target.files[0];
  }

  habilitar(){
    this.disabled = !this.disabled;
  }

}
