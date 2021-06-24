# Lab4ClinicaTPFinalGomezN

## Contenido

* [Acerca del proyecto](#acerca-del-proyecto)
* [Acerca de mi](#acerca-de-mi)
* [Cómo funciona](#cómo-funciona)
* - [Registro](#registro)
* - [Iniciar sesión](#iniciar-sesión)
* - [Acciones de usuarios](#acciones-de-usuarios)
## Acerca del proyecto

Este proyecto fue realizado con fines academicos para la materia Laboratorio IV en la UTN (Universidad Tecnologica Nacional) de Argetina.

El proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

Está preparado para poder desplegarse en heroku. La versión actual puede encontrarse en el siguiente link. [link](https://lab4clinicatpfinal-gomezn.herokuapp.com/)


## Acerca de mi

Mi nombre es Gomez Nicolas Rodrigo soy contador público recibido de la UBA (Universidadd de Buenos Aires) y aficionado a la tecnologia, en estos momentos soy estudiante de la UTNFra, estoy cursando la carrera de TECNICATURA SUPERIOR EN PROGRAMACIÓN.
(http://www.sistemas-utnfra.com.ar/#/home)


## Cómo funciona

### Registro
El sistema presenta distintos perfiles de usuarios. El paciente, el especialista y el administrador.

Para poder empezar el usuario paciente o profesional deberá registrarse en el sistema eligiendo el tipo de usuario.

![registro1](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/registro1.png)

El usuario paciente debe completar con sus datos y dos imágenes, teniendo que validar su correo, una vez registrado, para poder ingresar al sistema.

![registro2](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/registro2.png)

El usuario profesional debe completar con sus datos personales y sus especialidades (se pueden agregar especialidades nuevas). Para poder ingresar al sistema, su usuario deberá ser autorizado por un administrador a parte de verificar su email.

![registro3](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/registro3.png)

### Iniciar sesión

El usuario deberá ingresar con su email y contraseña.

![login](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/login.png)

### Acciones de usuarios

#### Todos

Tienen habilitado la seccion de mi perfil para ver sus datos personales registrados.

![miperfil](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/miperfil.png)

#### Administrador

El usuario administrador, al ingresar al sistema podrá autorizar usuarios profesionales y dar da alta nuevos administradores y usuarios del tipo Pacientes y Especialistas.

![autorizar](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/autorizar.png)

![altasadmin](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/altasadmin.png)

También podrá generar distintos tipos de informes y descargarlos a un documento (PDF o CSV segun corresponda).

![informes](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/grafico.png)

Por otro lado tiena la posibilidad de ver los turnos tomados y monitorear sus estados y cancelarlos de ser necesario.

![informes](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/grafico.png)

Tambien esta habilitado a generar turnos para los pacientes registrados.

![informes](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/pedirturno.png)


#### Paciente

Desde su perfil tiene la posibilidad de generar su Historia Clinica y descargar en PDF.

![historiaclinica](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/historiaclinica.png)

El usuario paciente podrá solicitar turnos seleccionando especialidad y profesional, eligiendo de un listado de turnos disponibles. El turno luego tendrá que ser aceptado por el profesional seleccionado.

![filtro](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/filtroespecialidad.png)

![turnos](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/turnos.png)

También tendrá disponible un listado con sus turnos. En el cual podrá ver el estado de sus turnos con distintas acciones disponibles. Tambien puede descargar su listado de turnos en diversos formatos.

![misturnos](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/misturnos.png)


#### Profesional

El usuario profesional podrá acceder a un listado con sus turnos para poder aceptarlos o rechazarlos. Y también para completar la reseña una vez atendido el paciente. Y luego completar su historia Clinica. Incluso poder ver la de cada paciente al seleccionar su nombre.

![misturnos2](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/misturnosespecialistas.png)

Y también tendrá la posibilidad de administrar sus horarios desde su perfil, como así también configurar la duración de sus consultas.

![horarios](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/mishorarios.png)