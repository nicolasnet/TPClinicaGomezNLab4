import { User } from "./user";

export class MisHorarios {
    email: string;
    especialidad: string;
    dias: string[];
    horarioInicial: number;
    horarioFinal: number;
    duracion: number;
    fechaCreacion: Date;
    usuario: User;
}
