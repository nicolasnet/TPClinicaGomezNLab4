import { Especialidad } from "./especialidad";

export type Roles = 'paciente' | 'especialista' | 'admin';

export class User {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    password?: string;
    photoURL?: string;
    role?: Roles;
    edad?: number;
    nombre?: string;
    apellido?: string;
    dni?: number;
    os?: string;
    imgFrente?: File;
    imgPerfil?: File;
    especialidad?: Array<Especialidad>;
    verificacionEspec?: boolean;
    id?: string;
    ingresos?: Array<Date>

    constructor(){
        this.especialidad = new Array<Especialidad>();
        this.ingresos = new Array<Date>();
    }
}
