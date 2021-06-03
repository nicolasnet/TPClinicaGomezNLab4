import { DiasLaborables } from "./dias-laborables";
import { User } from "./user";

export class MisHorarios {
    email: string;
    especialidad: string;
    dias: DiasLaborables[];
    horarioInicial: number;
    horarioFinal: number;
    duracion: number;
    fechaCreacion: Date;
    usuario: User;
}
