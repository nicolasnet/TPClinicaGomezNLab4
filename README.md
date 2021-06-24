## Development server

[Link](https://lab4clinicatpfinal-gomezn.herokuapp.com/)

## Uso

Se debe `Acceder` o `Registrarse` para poder utilizar lso servicios brindados.

## Registro

Todos los campos son obligatorios, se puede elegir entre Paciente o Especialista. `INCLUSO CAPTCHA`.

## Login

Ingresar con `Email` y `contraseña` previamente registrados. Obligatorio tener el `e-mail verificado`, sin eso no puede usar los servicios. En caso de usuarios especialistas tambien deben ser autorizados por un `ADMIN`.

## Mi Perfil

Se posee un perfil personal donde ver los datos registrados. En caso especialistas aca se establece los horarios de trabajo.

## Pedir Turno

Se puede filtrar por `Especialidad` y luego por `Especialista`.

## Mis turnos

Se listan los turnos solicitados con su informacion y acciones correspondientes.

# Lab4ClinicaTPFinalGomezN

<!-- Contenido -->
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

Está preparado para poder desplegarse en heroku. La versión actual puede encontrarse en el siguiente link. (https://lab4clinicatpfinal-gomezn.herokuapp.com/)


## Acerca de mi

Mi nombre es Gomez Nicolas Rodrigo soy contador público recibido de la UBA (Universidadd de Buenos Aires) y aficionado a la tecnologia, en estos momentos soy estudiante de la UTNFra. Actualmente estoy cursando la carrera de TECNICATURA SUPERIOR EN PROGRAMACIÓN
(http://www.sistemas-utnfra.com.ar/#/home)


## Cómo funciona

### Registro
El sistema presenta distintos perfiles de usuarios. El paciente, el especialista y el administrador.

Para poder empezar el usuario paciente o profesional deberá registrarse en el sistema eligiendo el tipo de usuario.

![registro1](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/registro1.png)

El usuario paciente debe completar con sus datos y dos imágenes, teniendo que validar su correo, una vez registrado, para poder ingresar al sistema.

![registro1](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/registro2.png)

El usuario profesional debe completar con sus datos personales y sus especialidades. Para poder ingresar al sistema, su usuario deberá ser autorizado por un administrador.

![registro2](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/registro3.png)

### Iniciar sesión

El usuario deberá ingresar sus credenciales y completar el captcha

![login](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/login.png)

### Acciones de usuarios

#### Administrador

El usuario administrador, al ingresar al sistema podrá autorizar usuarios profesionales y dar da alta nuevos administradores.

![autorizar](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/autorizar.png)

![adminalta](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/adminalta.png)

También podrá generar distintos tipos de informes y descargarlos a un documento.

![informes](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/informes.png)

#### Paciente

El usuario paciente podrá solicitar turnos seleccionando especialidad y profesional, eligiendo de un listado de turnos disponibles. El turno luego tendrá que ser aceptado por el profesional seleccionado.

![turnos](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/turnos.png)

También tendrá disponible un listado con sus turnos. En el cual podrá ver el estado de sus turnos, ver reseñas o descargarlas.

![misturnos](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/misturnos.png)

Y notificaciones correspondientes a sus turnos

![notificaciones](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/notificaciones.png)

#### Profesional

El usuario profesional podrá acceder a un listado con sus turnos para poder aceptarlos o rechazarlos. Y también para completar la reseña una vez atendido el paciente.

![misturnos2](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/misturnos2.png)

Y también tendrá la posibilidad de administrar sus horarios, como así también configurar la duración de sus consultas.

![horarios](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/horarios.png)

![duraciones](https://github.com/nicolasnet/TPClinicaGomezNLab4/blob/master/screenshots/duraciones.png)